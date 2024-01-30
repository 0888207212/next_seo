"use client";

import { getCookie } from "cookies-next";
import { useEffect } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";

const Product = () => {
  const { t } = useTranslation();

  return (
    <div className="px-6 py-5">
      <h2>Product</h2>
      <h3>{t("user.name")}</h3>
      <span
        data-tooltip-id="my-tooltip-1"
        style={{ backgroundColor: "#999", width: "30px" }}
        className="truncate"
      >
        Hello Tooltip Example
      </span>
      <ReactTooltip
        id="my-tooltip-1"
        place="right"
        content="Hello Tooltip Example"
        data-tooltip-delay-hide={1000}
      />
    </div>
  );
};

export default Product;
