"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { saveAs } from "file-saver";
import XlsxPopulate from "xlsx-populate";

const Export = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  const callAPI = async () => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
      const resData = await res.json();
      setData(resData || []);
    } catch (err) {
      console.log(err);
    }
  };

  // const handlePageDetail = (id: number) => {
  //   router.push(`/export/${id}`);
  // };
  const getSheetData = (data: any, header: any) => {
    var fields = Object.keys(data[0]);
    var sheetData = data.map(function (row: any) {
      return fields.map(function (fieldName) {
        return row[fieldName] ? row[fieldName] : "";
      });
    });
    sheetData.unshift(header);
    return sheetData;
  };

  const exportData = (data: any) => {
    var data1: any = [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: "Kulas Light",
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: "Multi-layered client-server neural-net",
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        address: "Victor Plains",
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
        company: "Proactive didactic contingency",
      },
      {
        id: 3,
        name: "Clementine Bauch",
        username: "Samantha",
        email: "Nathan@yesenia.net",
        address: "Douglas Extension",
        phone: "1-463-123-4447",
        website: "ramiro.info",
        company: "Face to face bifurcated interface",
      },
    ];
    let header = [
      "id",
      "name",
      "username",
      "email",
      "address",
      "phone",
      "website",
      "company",
    ];

    XlsxPopulate.fromBlankAsync().then(async (workbook: any) => {
      const sheet1 = workbook.sheet(0);
      const sheetData = getSheetData(data1, header);
      const totalColumns = sheetData[0].length;

      sheet1.cell("A1").value(sheetData);
      const range = sheet1.usedRange();
      const endColumn = String.fromCharCode(64 + totalColumns);
      sheet1.row(1).style("bold", true);
      sheet1.range("A1:" + endColumn + "1").style("fill", "BFBFBF");
      range.style("border", true);
      return workbook.outputAsync().then((res: any) => {
        saveAs(res, "fileTest.xlsx");
      });
    });
  };

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <div className="px-6 py-5">
      <h2>List User</h2>
      {data && (
        <div className="mt-5">
          <>
            {data.map((item: any, _) => {
              return (
                <div key={item?.id} className="cursor-pointer border mb-4">
                  <div>Name: {item?.name}</div>
                  <div>UserName: {item?.username}</div>
                  <div>Phone: {item?.phone}</div>
                  <div>Website: {item?.website}</div>
                  <div>Company: {item?.company?.name}</div>
                  <button
                    onClick={() => exportData(item)}
                    className="p-2 my-2 bg-[#d0d8d0]"
                  >
                    Export data
                  </button>
                </div>
              );
            })}
          </>
        </div>
      )}
    </div>
  );
};

export default Export;
