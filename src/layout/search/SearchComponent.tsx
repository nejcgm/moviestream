import React, { useEffect, useState } from "react";
import ListItem from "../../list-movie/list-components/ListItem";
import { fetchSearch, SearchResult } from "../../functions/Fetching.js";
import { useDebounce } from "../../functions/Hooks.jsx";
import { useNavigate } from "react-router-dom";
import MenuButton from "../menu/MenuButton";

const Search = () => {
  const [query, setQuery] = useState<string | undefined>("");
  const [MovieSearch, setMovieSearch] = useState<SearchResult[]>([]);
  const [cardCount, setCardCount] = useState(5);
  const navigate = useNavigate();

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const loadSearch = async () => {
      if (debouncedQuery) {
        const data = await fetchSearch(debouncedQuery);
        setMovieSearch(data);
      }
    };

    loadSearch();
  }, [debouncedQuery]);

  return (
    <>
      {query && (
        <div
          onClick={() => {
            setQuery(undefined);
          }}
          className="fixed w-screen h-screen z-10"
        ></div>
      )}
      <div className=" w-full items-center justify-center flex mt-[32px] mb-[32px] gap-4">
        <button
          className="hidden sm:flex w-[48px] h-[48px]"
          onClick={() => {
            navigate("/");
          }}
        >
          <svg
            fill="#f5c518"
            className="w-full h-full "
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 548.291 548.291"
            xmlSpace="preserve"
            stroke="#f5c518"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M263.216,425.947h-0.241c-1.221,5.293-2.434,12.044-3.777,17.199l-4.882,18.924h18.175l-5.111-18.924 C265.903,437.854,264.442,431.24,263.216,425.947z"></path>{" "}
                  <path d="M472.929,131.385c-0.031-2.514-0.839-4.992-2.566-6.96L364.656,3.667c-0.031-0.029-0.062-0.044-0.084-0.07 c-0.63-0.709-1.365-1.284-2.142-1.795c-0.231-0.149-0.463-0.29-0.704-0.42c-0.672-0.37-1.376-0.667-2.121-0.888 c-0.2-0.058-0.377-0.144-0.577-0.186C358.231,0.113,357.4,0,356.561,0H96.757C84.904,0,75.255,9.644,75.255,21.502V526.79 c0,11.854,9.649,21.501,21.502,21.501h354.775c11.853,0,21.503-9.647,21.503-21.501v-394.2 C473.036,132.186,472.971,131.79,472.929,131.385z M155.403,427.396h-31.581v20.384h29.51v16.415h-29.51v35.854h-18.659v-89.188 h50.24V427.396z M220.777,500.049h-51.339v-89.188h18.659v72.247h32.681V500.049z M281.515,500.049l-6.342-22.898h-23.541 l-5.848,22.898h-19.266l25.114-89.188h24.39l25.486,89.188H281.515z M332.613,501.372c-9.386,0-18.656-2.646-23.287-5.428 l3.781-16.672c4.996,2.776,12.681,5.553,20.608,5.553c8.534,0,13.05-3.842,13.05-9.669c0-5.555-3.905-8.724-13.784-12.566 c-13.66-5.155-22.547-13.366-22.547-26.332c0-15.217,11.696-26.86,31.086-26.86c9.271,0,16.09,2.126,20.973,4.503l-4.143,16.27 c-3.28-1.717-9.144-4.226-17.196-4.226c-8.037,0-11.948,3.963-11.948,8.597c0,5.697,4.625,8.2,15.244,12.568 c14.506,5.827,21.346,14.031,21.346,26.604C365.789,488.667,355.174,501.372,332.613,501.372z M446.158,500.049h-18.542v-37.317 h-30.603v37.317h-18.667v-89.188h18.667v34.27h30.603v-34.27h18.542V500.049z M96.757,365.076V21.502H345.81v110.006 c0,5.935,4.819,10.751,10.751,10.751h94.972v222.816H96.757z"></path>{" "}
                  <path d="M280.224,154.717c-23.728,17.785-38.752,66.04-51.405,92.531c-12.659,26.489-35.977,23.339-35.977,23.339v31.212 c0,0,14.627,0.41,26.866-4.703c12.284-5.145,26.512-16.635,34.833-30.839c3.236-5.564,8.187-16.998,13.572-29.672h37.439v-32.045 h-23.749c3.659-8.136,6.966-15.029,9.477-18.958c9.107-14.224,31.653-13.858,31.653-13.858v-30.455 C322.933,141.267,303.951,136.918,280.224,154.717z"></path>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>
        </button>

        <div className=" w-[70%] sm:w-[40%] flex-col">
          <input
            className="relative  z-20 font-roboto py-1 px-3 sm:py-2 sm:px-6 rounded-lg w-full focus-none outline-offset-[-2px] outline-[#F5C518] "
            type="text"
            placeholder="Search for movies..."
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onFocus={(e) => {
              setQuery(e.target.value);
            }}
          />

          {query && (
            <div className="relative w-full z-20">
              <div className="absolute p-3 sm:p-6 bg-[#1F1F1F] w-full flex flex-col gap-2 sm:gap-4 rounded-lg">
                {MovieSearch?.slice(0, cardCount)?.map(
                  (item: SearchResult, index: number) => (
                    <ListItem
                      index={null}
                      poster={item.poster_path || item.profile_path}
                      title={item.title ? item.title : item.name}
                      movieId={item.id}
                      voteCount={item.vote_count}
                      year={item.release_date || item.first_air_date}
                      type={item.media_type}
                      rating={null}
                      key={index}
                      onCancel={() => {
                        setQuery(undefined);
                      }}
                      largeScreen={false}
                    />
                  )
                )}
                {MovieSearch.length > 5 && (
                  <button
                    onClick={() => {
                      setCardCount((prevValue) => (prevValue === 5 ? 10 : 5));
                    }}
                    className="text-white text-[14px] font-roboto"
                  >
                    {cardCount == 5 ? "View More" : "view Less"}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        <MenuButton />
      </div>
    </>
  );
};

export default Search;
