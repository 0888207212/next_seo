"use client";
import { useEffect, useState } from "react";

const AboutDetails = (id: any) => {
  const [data, setData] = useState<any>({});

  const getAboutDetail = async () => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id.id}`
      );
      const resData = await res.json();
      setData(resData || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAboutDetail();
  }, []);

  return (
    <div className="px-6 py-5">
      <h2>-_-</h2>
      <div>{data?.title}</div>
    </div>
  );
};

export default AboutDetails;
