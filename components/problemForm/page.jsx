"use client";
import { useState } from "react";
import classes from "./problem.module.css";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
export default function Problems(props) {
  const id = props.id;
  const name = props.name;
  const status = props.status;

  const [data, setData] = useState({
    title: "",
    content: "",
    buildingNumber: "",
    floorNumber: "",
    roomNumber: "",
  });

  const SubmitHandler = async (e) => {
    e.preventDefault();

    toast.info("on going", { autoClose: 5000 });

    const res = await fetch("http://localhost:3000/api/problems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, id, name, status }),
    });

    const result = await res.json();
    
    console.log(result.error);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success("Problem Added", { autoClose: 4000 });
    // console.log("result  =  ", result);
    setData({
      title: "",
      content: "",
      buildingNumber: "",
      floorNumber: "",
      roomNumber: "",
    });
  };
  return (
    <form className={classes.form} onSubmit={SubmitHandler}>
      <div className={classes.box1}>
        <label className={classes.label}> Problem Type</label>
        <select
          id="title"
          name="title"
          className={classes.select}
          placeholder="Problem Type"
          value={data.title}
          onChange={(e) => {
            setData({ ...data, title: e.target.value });
          }}
        >
          <option className={classes.option} value="null">
            Select Problem{" "}
          </option>
          <option className={classes.option} value="Electrical">
            Electrical
          </option>
          <option className={classes.option} value="Carpentary">
            Carpentary
          </option>
          <option className={classes.option} value="Plumber">
            Plumber
          </option>
          <option className={classes.option} value="other">
            other
          </option>
        </select>
      </div>
      <div className={classes.box2}>
        {/* <label className={classes.label}>content</label> */}
        <textarea
          className={classes.textarea}
          type="text"
          placeholder="Content"
          value={data.content}
          onChange={(e) => {
            setData({ ...data, content: e.target.value });
          }}
        />
      </div>

      <div className={classes.box3}>
        {/* <label className={classes.label}>Location</label> */}
        <input
          className={classes.input}
          type="number"
          placeholder="Building Number"
          value={data.buildingNumber}
          onChange={(e) => {
            setData({ ...data, buildingNumber: e.target.value });
          }}
        />
        <input
          className={classes.input}
          type="number"
          placeholder="Floor Number"
          value={data.floorNumber}
          onChange={(e) => {
            setData({ ...data, floorNumber: e.target.value });
          }}
        />
        <input
          className={classes.input}
          type="number"
          placeholder="Room Number"
          value={data.roomNumber}
          onChange={(e) => {
            setData({ ...data, roomNumber: e.target.value });
          }}
        />
      </div>
      <button className={classes.submit} type="submit">
        Submit
      </button>
    </form>
  );
}
