import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
const BackgroundImage = () => {
  const { photo } = useContext(DataContext);

  let background = {
    image: `url(${photo})`,
    size: "cover",
    position: "center",
  };

  return background;
};

export default BackgroundImage;
