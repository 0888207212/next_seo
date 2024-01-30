import { Select } from "antd";
import i18n from "../../locales/i18n";
import { useEffect, useState } from "react";

const SelectLanguage = () => {
  const language = [
    {
      value: "vi",
      label: "VietNam",
    },
    {
      value: "en",
      label: "English",
    },
    {
      value: "jp",
      label: "Japan",
    },
  ];
  const [useLanguage, setUseLanguage] = useState("vn");

  useEffect(() => {
    i18n.changeLanguage(useLanguage);
  }, [useLanguage]);

  const onChange = (value: string) => {
    setUseLanguage(value);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div>
      <Select
        style={{ width: 120 }}
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        defaultValue="vi"
        options={language}
      />
    </div>
  );
};

export default SelectLanguage;

// example use
// <Icon
//   name="vn"
//   label="Icon vn"
//   width="24"
//   height="24"
//   style="cursor-pointer"
// />;
