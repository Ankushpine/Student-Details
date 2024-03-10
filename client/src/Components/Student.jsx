import { useState, useEffect } from "react";
import style from "./Student.module.css";
import axios from "axios";

export function Student() {
  const [students, getStudents] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const url = import.meta.env.VITE_APP_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await axios.get(`${url}/getAll`);
      setLoading(false);

      getStudents(data.data);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const student = { name, address };
    setLoading(true);
    await axios.post(`${url}/add`, student);
    setLoading(false);

    window.location.reload();
  };

  return (
    <>
      <h1>Add Student</h1>

      <div className={style.blogContainer}>
        <form className={style.form} onSubmit={handleSubmit}>
          <h2>Name</h2>

          <input
            className={style.inputTitle}
            type="text"
            placeholder="Enter the title here ....."
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <h2>Address</h2>
          <input
            className={style.inputContent}
            type="text"
            placeholder="Enter the Content here ....."
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <br />
          <button className={style.buttonAdd}>ADD</button>
        </form>
      </div>
      <hr />

      <h1>Students</h1>

      {loading ? (
        <div class="loader"></div>
      ) : (
        <>
          {students.map((value) => (
            <div className={style.blogPost} key={value.id}>
              <h3>Name: {value.name}</h3>
              <p>Address: {value.address}</p>
            </div>
          ))}
        </>
      )}
    </>
  );
}
