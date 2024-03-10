import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';
import { Button, Container, Grid } from '@mui/material';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/registration');
  };

  return (
      <Grid container alignItems={'center'}>
        <Grid item xl={8} lg={8} md={8} sm={8}>
          <h2>{heading}</h2>
          <p>
          Your hub for personal growth, connection, and goal achievement. Whether you're striving to conquer a new challenge, 
          pursue a passion, or simply connect with others who share your aspirations, you've come to the right place. 
          Our platform is designed to support you every step of the way, providing resources, tools, and a vibrant community 
          to help you turn your dreams into reality. Join us as we embark on this journey together, empowering one another 
          to reach new heights and create a life filled with purpose and fulfillment. Welcome aboard!
          </p>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={4}>
          <LoginForm/>

          <center>
            <h6>Not a Member? Register for free</h6>
            <button
              type="button"
              className="btn btn_asLink"
              onClick={() => {
                history.push('/registration');
              }}>
              Register
            </button>
          </center>

        </Grid>
      </Grid>
    // <div className="container">
      

    //   <div className="grid">
    //     <div className="grid-col grid-col_8">
          // <h2>{heading}</h2>
          // <p>
          //   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          //   id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra lacus
          //   ut ex molestie blandit. Etiam et turpis sit amet risus mollis
          //   interdum. Suspendisse et justo vitae metus bibendum fringilla sed
          //   sed justo. Aliquam sollicitudin dapibus lectus, vitae consequat odio
          //   elementum eget. Praesent efficitur eros vitae nunc interdum, eu
          //   interdum justo facilisis. Sed pulvinar nulla ac dignissim efficitur.
          //   Quisque eget eros metus. Vestibulum bibendum fringilla nibh a
          //   luctus. Duis a sapien metus.
          // </p>

          // <p>
          //   Praesent consectetur orci dui, id elementum eros facilisis id. Sed
          //   id dolor in augue porttitor faucibus eget sit amet ante. Nunc
          //   consectetur placerat pharetra. Aenean gravida ex ut erat commodo, ut
          //   finibus metus facilisis. Nullam eget lectus non urna rhoncus
          //   accumsan quis id massa. Curabitur sit amet dolor nisl. Proin
          //   euismod, augue at condimentum rhoncus, massa lorem semper lacus, sed
          //   lobortis augue mi vel felis. Duis ultrices sapien at est convallis
          //   congue.
          // </p>

          // <p>
          //   Fusce porta diam ac tortor elementum, ut imperdiet metus volutpat.
          //   Suspendisse posuere dapibus maximus. Aliquam vitae felis libero. In
          //   vehicula sapien at semper ultrices. Vivamus sed feugiat libero. Sed
          //   sagittis neque id diam euismod, ut egestas felis ultricies. Nullam
          //   non fermentum mauris. Sed in enim ac turpis faucibus pretium in sit
          //   amet nisi.
          // </p>
    //     </div>
    //     <div className="grid-col grid-col_3">
    //       {/* <RegisterForm /> */}
          // <LoginForm/>

          // <center>
          //   <h4>Already you Member?</h4>
          //   <button className="btn btn_sizeSm" onClick={onLogin}>
          //     Register
          //   </button>
          // </center>
    //     </div>
    //   </div>
    // </div>
  );
}

export default LandingPage;
