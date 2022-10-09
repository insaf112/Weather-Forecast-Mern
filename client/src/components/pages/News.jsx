import React from "react";
import { DataContext } from "../../context/DataContext";
import BackgroundImage from "../DryComponents/BackGroundImage";
import "./News.css";
import "../MainContent/MergeStyles.css";
import { useContext } from "react";

const News = () => {
  const { newsData } = useContext(DataContext);

  return (
    <>
      {/* {isLoading ? <SearchSpinner /> : ()} */}
      <div
        style={{
          backgroundImage: BackgroundImage().image,
          backgroundPosition: BackgroundImage().position,
          backgroundSize: BackgroundImage().size,
        }}
        className="news-page sidebar-open default-styles"
      >
        <div className="dark-transparent">
          <div className="news-container">
            <h1>News</h1>

            <div className="news-box">
              {newsData.map((article, index) => (
                <div className="news-item" key={index}>
                  <a href={article.link} rel="noreferrer" target="_blank">
                    <img
                      src={
                        article.media
                          ? article.media
                          : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                      }
                      alt="News Img"
                      onError={(e) => {
                        e.target.src =
                          "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
                      }}
                    />
                    <h1 className="news-title">
                      {article.title
                        ? article.title.slice(0, 70)
                        : "Title Not Found"}
                      ...
                    </h1>
                  </a>
                  <p className="news-desc">
                    {article.excerpt
                      ? article.excerpt.slice(0, 110)
                      : "Description Not Found"}
                    ...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
