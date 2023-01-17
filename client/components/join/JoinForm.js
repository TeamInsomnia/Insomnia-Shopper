// this join form (i.e, register a new user) is modeled after AuthForm.js

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../features";
import { createUser } from "../../features/users/singleUserSlice";

const JoinForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.desiredUser.value;
    const password = event.target.password.value;
    const email = event.target.email.value;

    const user = {
      username,
      password,
      email,
    };

    dispatch(createUser(user));
    setUsername("");
    setPassword("");
  };
  return (
    <div>
      <h3>Insomnia begins right here, right now.</h3>
      <form id="createuseform" onSubmit={handleSubmit}>
        <label>
          First name:
          <input type="text" name="firstName" />
        </label>
        <label>
          Last name:
          <input type="text" name="lastName" />
        </label>
        <label>
          Address 1:
          <input type="text" name="addr1" />
        </label>
        <label>
          Address 2, if applicable:
          <input type="text" name="addr2" />
        </label>
        <label>
          <b>Email*</b>:
          <input
            type="text"
            name="email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </label>
        <label>
          Phone (only digits)
          <input type="text" name="phone" />
        </label>
        <label>
          City:
          <input type="text" name="city" />
        </label>
        {/* <label>
          ID:
          <input type="text" name="id" />
        </label>{" "} */}
        <select>
          <option value="AL">AL</option>
          <option value="AK">AK</option>
          <option value="AR">AR</option>
          <option value="AZ">AZ</option>
          <option value="CA">CA</option>
          <option value="CO">CO</option>
          <option value="CT">CT</option>
          <option value="DC">DC</option>
          <option value="DE">DE</option>
          <option value="FL">FL</option>
          <option value="GA">GA</option>
          <option value="HI">HI</option>
          <option value="IA">IA</option>
          <option value="ID">ID</option>
          <option value="IL">IL</option>
          <option value="IN">IN</option>
          <option value="KS">KS</option>
          <option value="KY">KY</option>
          <option value="LA">LA</option>
          <option value="MA">MA</option>
          <option value="MD">MD</option>
          <option value="ME">ME</option>
          <option value="MI">MI</option>
          <option value="MN">MN</option>
          <option value="MO">MO</option>
          <option value="MS">MS</option>
          <option value="MT">MT</option>
          <option value="NC">NC</option>
          <option value="NE">NE</option>
          <option value="NH">NH</option>
          <option value="NJ">NJ</option>
          <option value="NM">NM</option>
          <option value="NV">NV</option>
          <option value="NY">NY</option>
          <option value="ND">ND</option>
          <option value="OH">OH</option>
          <option value="OK">OK</option>
          <option value="OR">OR</option>
          <option value="PA">PA</option>
          <option value="RI">RI</option>
          <option value="SC">SC</option>
          <option value="SD">SD</option>
          <option value="TN">TN</option>
          <option value="TX">TX</option>
          <option value="UT">UT</option>
          <option value="VT">VT</option>
          <option value="VA">VA</option>
          <option value="WA">WA</option>
          <option value="WI">WI</option>
          <option value="WV">WV</option>
          <option value="WY">WY</option>
        </select>
        <label>
          <b>Desired USERNAME*:</b>
          <input
            type="text"
            name="desiredUser"
            value={username}
            onChange={(evt) => setUsername(evt.target.value)}
          />
        </label>
        <h6>
          <i>
            Username attributes: Between 4 and 16 characters. Use letters,
            numbers or a mix. Periods and underscores are optional. All other
            special characters are forbidden, as are spaces. Eligible examples:
            maru, MARU, 2439778, cher1se, johN_48, .556k
          </i>
        </h6>
        <label>
          <b> PASSWORD* (case-sensitive)</b>:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </label>{" "}
        [ fancy Show/Hide button would live here.]{" "}
        <h6>
          {" "}
          <i>
            {" "}
            For robust security, these are the attributes: Between 8 and 20
            characters. Must include numbers and letters (both cases). Must NOT
            match username. Must include at least one of these four: ! @ $ &.
            Spaces and all other characters forbidden.
          </i>
        </h6>
        <label>
          Confirm password:
          <input type="password" name="confirmPassword" />
        </label>
        <label>
          <b>Custom</b> challenge question:
          <input type="text" name="challenge" />
        </label>
        <label>
          Challenge response (not case sensitive):
          <input type="text" name="challengeGo" />
        </label>
        This button will <b>ONLY </b> activate once email, username and password
        fields are completed. Restrictions on length/format/characters/validity
        are pending.....<br></br>
        <input
          type="submit"
          disabled={
            email.length === 0 || username.length === 0 || password.length === 0
          }
          value="Submit for no sleep."
        />
      </form>
    </div>
  );
};
export default JoinForm;
