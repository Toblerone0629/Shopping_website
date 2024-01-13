import { useState } from "react";
import { FormControl, FormHelperText } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import './dialog.css';

const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const EmailBar = () => {
    // eslint-disable-next-line react/prop-types
    const [validEmail, setValidEmail] = useState(true);
    const validateEmail = (event) => {
        const curr_email = event.target.value;
        if (curr_email.match(EMAIL_REGEX)) {
            setValidEmail(true);
        } else {
            setValidEmail(false);
        }
    };
    return (
        <div className="inputContainer">
            <div className="inputTitle">Email</div>
            <FormControl sx={{ marginTop: 1, width: "100%" }}>
                <OutlinedInput
                    onChange={(event) => validateEmail(event)}
                    placeholder="you@email.com"
                    type="email"
                    error={!validEmail}
                />
                {!validEmail &&
                    <FormHelperText error className="errorReminder" >
                        Invalid Email input!
                    </FormHelperText>
                }
            </FormControl>
        </div>
    );
};

export default EmailBar;