import React, { Component } from "react";
import "./css/footer.css"
export default class footer extends Component {
  render() {
    return (
      <footer class="site-footer bg-dark text-center text-white">


        <div class="container fixed-bottom ">
          <div class="row">
            <div class="col-md-8 col-sm-6 col-xs-12">
              <p class="copyright-text">
                Copyright &copy; 2017 All Rights Reserved by
              </p>
            </div>


          </div>
        </div>
      </footer>
    );
  }
}
