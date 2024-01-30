import IconVn from "../../assets/icons/vietnam.svg";
import IconEn from "../../assets/icons/english.svg";
import IconJp from "../../assets/icons/japan.svg";

type TypeName = "vn" | "en" | "jp";
interface Icon {
  name: TypeName;
  label: string;
  width: string;
  height: string;
  style: string;
}

const Icons: any = {
  vn: IconVn,
  en: IconEn,
  jp: IconJp,
};

export const Icon = (props: Icon) => {
  return (
    <img
      src={Icons[props.name].src}
      alt={props.label}
      width={props.width}
      height={props.height}
      className={props.style}
    />
  );
};
