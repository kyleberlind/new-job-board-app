import Button from 'react-bootstrap/Button';

import React, { useState } from 'react';

import './css/Home.css';

function Home() {
    return (
        <div className="root">
            <h1>
                New Job Board Application
            </h1>
            <div className="buttonContainer">
                <Button
                    className="button"
                    href={"/employer/login"}
                    variant="primary"
                    block
                >
                    Login as Employer
                </Button>
                <Button
                    className="button"
                    href={"/applicant/login"}
                    variant="primary"
                    block
                >
                    Login as Applicant
                </Button>
                <Button
                    className="button"
                    href={"/employer/signup"}
                    variant="outline-primary"
                    block
                >
                    Sign up as Employer
                </Button>
                <Button
                    className="button"
                    href={"/applicant/signup"}
                    variant="outline-primary"
                    block
                >
                    Sign up as Applicant
                </Button>
            </div>
        </div>
    );
}

export default Home;
