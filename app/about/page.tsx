"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const About = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  const callAPI = async () => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      const resData = await res.json();
      setData(resData || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageDetail = (id: number) => {
    router.push(`/about/${id}`);
  };

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <div className="px-6 py-5">
      <h2>About</h2>
      {data && (
        <div className="mt-5">
          <>
            {data.map((item: any, _) => {
              return (
                <div
                  key={item?.id}
                  className="cursor-pointer"
                  onClick={() => {
                    handlePageDetail(item.id);
                  }}
                >
                  <div> {item?.title}</div>
                </div>
              );
            })}
          </>
        </div>
      )}
    </div>
  );
};

export default About;
