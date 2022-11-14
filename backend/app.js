const express = require("express");
const app = express();
const axios = require("axios");
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const mongoUrl =
  "mongodb+srv://LikhithaKathireddy:DJg2RujJ1EQxxZeD@cluster0.kblhvs2.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./userDetails");

const User = mongoose.model("webapp");


app.post("/register", async (req, res) => {
  const { fname, lname, email,phonenumber, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      phonenumber,
      password: encryptedPassword,
    });
    console.log("user created")
    console.log(User)
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }

  if (await bcrypt.compare(password, user.password)) {
    const otp = `${Math.floor(1000 + Math.random()*9000)}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "likhikreddy@gmail.com",
        pass: "mocffidujwlyxtnt",
      },
    });
  
    var mailOptions = {
      from: "likhikreddy@gmail.com",
      to: user.email,
      subject: "Login OTP",
      html: `<p>Enter this OTP : ${otp} to Login into your account, OTP expires in 10 minutes</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    await User.updateOne(
      {
        email: user.email,
      },
      {
        $set: {
          otp: otp,
        },
      }
    );
    res.json({status: "ok"});
  }else{
    res.json({ status: "error", error: "Invalid Password" });
  }
  
});


app.post("/login-otp", async (req, res) => {
  const { otp, email } = req.body;
  const user = await User.findOne({ email });
  if (await otp == user.otp) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);
    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid OTP" });
});


app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.listen(5000, () => {
  console.log("Server Started");
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "likhikreddy@gmail.com",
        pass: "mocffidujwlyxtnt",
      },
    });

    var mailOptions = {
      from: "likhikreddy@gmail.com",
      to: oldUser.email,
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
  } catch (error) {}
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});

app.post("/editProfile", async (req, res) => {
  const { email,fname,lname,phonenumber } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    console.log(User)
    if (oldUser) {
     const result = await User.updateOne(
      {email:email},{
        $set: {
          fname: fname,
          lname:lname,
          phonenumber:phonenumber
        },
      }
      );
      console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`)

      res.send({ status: "ok" });
    }
   
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/changepassword", async (req, res) => {
  const {token, email, currentpassword, newpassword, confirmpassword } = req.body;

  const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "error" });
    }
  const secret = JWT_SECRET + oldUser.password;
 
    try {
      const verify = jwt.verify(token, secret);
      const encryptedPassword = await bcrypt.hash(newpassword, 10);
      await User.updateOne(
        {
          email: email,
        },
        {
          $set: {
            password: encryptedPassword,
          },
        }
      );
      return res.json({ status: "ok" });
    } catch (error) {
      console.log(error);
      res.json({ status: "error2" });
    }
});

app.get("/search", async (req, res) => {
  const body = {
    query: {
      multi_match: {
        query: req.query.search,
        fields: ["title", "text"],
        type: "best_fields",
        tie_breaker: 0.3,
        minimum_should_match: "30%",
      },
    },
    highlight: {
      pre_tags: ["<em>"],
      post_tags: ["</em>"],
      fields: {
        body: {},
      },
    },
    size: 1000
    // "query": {
    //   "match": {
    //     "title":
    //   }
    // }
  };
  console.log("req.query.search", body);

  const response = await axios({
    method: "GET",
    url: `http://localhost:9200/library/_search`,
    data: body,
  });
  console.log("response.data", response.data);
  res.json({

    results: response.data?.hits?.hits,
    count: response.data?.hits?.total?.value,
  });
});

app.post("/insert", async (req, res) => {
  const {etd_file_id, advisor, author, degree, program, title, university, year, text, pdf} = req.body;
  const wikifier_terms = [];
  try {
    const options = {
    url: "http://localhost:9200/wiki_library/_doc/" + (etd_file_id),
      body: {
       
            "etd_file_id": etd_file_id,
            "advisor": advisor,
            "author": author,
            "degree": degree,
            "program":program,
            "title": title,
            "university": university,
            "year": year,
            "text": text,
            "wikifier_terms": wikifier_terms,
            "pdf": pdf
      },
      json: true
    }
    console.log(options)
    await request.post(options, function (err, data) {
      //console.log("at request")
      res.send(data);
      console.log(data)
    });
  } catch (error) {
    console.log(error)
  }
});