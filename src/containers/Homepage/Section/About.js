import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

class About extends Component {
  render() {
    return (
      <>
        <div className="section-share section-about">
          <div className="section-container">
            <div className="section-about-content">
              <div className="section-about-content-left"></div>
              <div className="section-about-content-right">
                <p>
                  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod debitis nisi molestiae ad repellat
                  ullam atque libero totam? Nemo sequi minima nobis voluptatem distinctio, nam perspiciatis vel
                  dignissimos maiores id. Voluptates aliquam dolor minima saepe consequuntur non doloribus ipsam ratione
                  incidunt, modi et a eius doloremque vero aliquid blanditiis cupiditate iure quidem porro corporis,
                  eveniet voluptate necessitatibus. Quisquam, nostrum est. Nesciunt commodi, tenetur at reiciendis
                  dolorem voluptatum architecto tempora natus vitae, non dicta eaque recusandae velit! Quaerat
                  exercitationem dicta aperiam quasi!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
