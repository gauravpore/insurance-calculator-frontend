import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [age, setAge] = useState([]);
  const [city_tier, setCityTier] = useState("");
  const [tenure, setTenure] = useState("");
  const [sum_insured, setSumInsured] = useState("");
  const [ageList, setAgeList] = useState("");
  const [responseData, setResponseData] = useState({});

  const appendToList = () => {
    const input = document.getElementById("age").value;
    const values = input.split(",");

    let updatedList = [...age]; // Create a new array to preserve immutability

    values.forEach((value) => {
      const trimmedValue = parseFloat(value.trim()); // Convert to number
      if (!isNaN(trimmedValue) && updatedList.length < 5) {
        updatedList.push(trimmedValue);
      }
    });

    setAge(updatedList);
    // document.getElementById("age").value = ""; //

    console.log(updatedList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://insurance-flask-app.onrender.com/calculate-premium/",

        {
          age: ageList.split(",").map(Number),
          city_tier: parseInt(city_tier),
          tenure: parseInt(tenure),
          sum_insured: parseInt(sum_insured),
        }
      );
      console.log({ age, city_tier, tenure, sum_insured });
      console.log(response.data);
      setResponseData(response.data);
      setAge([]); // setAge explicitly
    } catch (error) {
      console.error(error); // Handle error if the request fails
    }
  };

  const onChangeAge = (event) => {
    const { value } = event.target;
    setAgeList(value);
  };

  return (
    <div className="App">
      <div class="box1">
        <h1 id="title">Insurance Premium Calculator</h1>
        <h3 id="title">- By Gaurav Pore</h3>
        <form onSubmit={handleSubmit}>
          <label for="paramlabel">
            Age:&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              id="age"
              type="text"
              placeholder="your age"
              value={ageList} // Use ageList state variable instead of age
              onChange={onChangeAge}
              // value={age}
              // onChange={(e) => setAge(e.target.value)}
              // min="0"
              // max="90"
              required
            />
            {/* <button onClick={appendToList}>+</button> */}
          </label>
          <br />
          <label for="paramlabel">
            City Tier:&nbsp;&nbsp;&nbsp;
            <select
              value={city_tier}
              onChange={(e) => setCityTier(e.target.value)}
              required
            >
              <option value="">
                &nbsp;&nbsp;-- Select City Tier --&nbsp;&nbsp;
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </label>
          <br />
          <label for="paramlabel">
            Tenure:&nbsp;&nbsp;&nbsp;
            <select
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              required
            >
              <option value="">
                &nbsp;&nbsp;-- Select Tenure --&nbsp;&nbsp;
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </label>
          <br />
          <label for="paramlabel">
            Sum Insured:&nbsp;&nbsp;&nbsp;
            <select
              value={sum_insured}
              onChange={(e) => setSumInsured(e.target.value)}
              required
            >
              <option value="">
                &nbsp;&nbsp;-- Select Sum Insured --&nbsp;&nbsp;
              </option>
              <option value="300000">300000</option>
              <option value="400000">400000</option>
              <option value="500000">500000</option>
            </select>
          </label>
          <br />
          <button type="submit" class="white-button" onClick={appendToList}>
            &nbsp;&nbsp;Submit&nbsp;&nbsp;
          </button>
        </form>
        <h3 id="responseData">Final Total</h3>
        <p>{responseData?.response?.final_total || "0"}</p>
      </div>
    </div>
  );
}

export default App;