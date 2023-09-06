import React from "react";
import * as Components from "./Components";
import './user.scss'
import Register from "./Register";
import Login from "./Login";


export default function Test() {
    const [signIn, toggle] = React.useState(true);
    return (
        <div className="sc-bcPKhP21">
            <Components.Container>
                <Components.SignUpContainer signingIn={signIn}>
                    <Register />
                </Components.SignUpContainer>
                <Components.SignInContainer signingIn={signIn}>
                    <Login />
                </Components.SignInContainer>
                <Components.OverlayContainer signingIn={signIn}>
                    <Components.Overlay signingIn={signIn}>
                        <Components.LeftOverlayPanel signingIn={signIn}>
                            <Components.Title>Welcome Back!</Components.Title>
                            <Components.Paragraph>
                                To keep connected with us please login with your personal info
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>
                                Sign In
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>
                        <Components.RightOverlayPanel signingIn={signIn}>
                            <Components.Title>Hello, Friend!</Components.Title>
                            <Components.Paragraph>
                                Enter your personal details and start journey with us
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Sign Up
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>
                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
        </div>

    );
}
