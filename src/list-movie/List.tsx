import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ListItem from "./list-components/ListItem";
import Spiner from "../components/Spinner";
import GenreListComponent from "./list-components/GenreListComponent";
import BackButton from "../components/BackButton";
import { fetchSpecific } from "../functions/Fetching.ts";
import { formatTitle } from "../functions/Functions.ts";
import { DataInfoProps, MediaType } from "../functions/Interfaces.ts";

const List: React.FC = () => {
  const [listItems, setListItems] = useState<DataInfoProps[]>([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const type = searchParams.get("type") as MediaType;
  const title: string | null = searchParams.get("title");

  const [counter, setCounter] = useState(1);
  const [loading, setLoading] = useState(false);
  const lastItemRef = useRef<HTMLDivElement | null>(null);
  const [genreList, setGenreList] = useState<number[]>([]);
  const [endOfList, setEndOfList] = useState(false);

  useEffect(() => {
    setCounter(1);
    setListItems([]);
  }, [genreList]);

  useEffect(() => {
    const loadList = async () => {
      if (search != "discover") {
        setLoading(true);
        const data = await fetchSpecific(type, "", search, null, counter);
        if (data && data.results) {
          setListItems((prevItems: DataInfoProps[]) => [
            ...prevItems,
            ...data.results,
          ]);
        }
        setLoading(false);
      } else {
        setLoading(true);
        setEndOfList(false);
        const data = await fetchSpecific(search, type, "", genreList, counter);
        if (data && data.results.length !== 0) {
          setListItems((prevItems: DataInfoProps[]) => [
            ...prevItems,
            ...data.results,
          ]);
          setLoading(false);
        } else {
          setEndOfList(true);
          return;
        }
      }
    };
    loadList();
  }, [type, search, counter, genreList]);

  useEffect(() => {
    if (endOfList) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCounter((prev) => prev + 1);
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 1.0 }
    );

    if (lastItemRef.current) {
      observer.observe(lastItemRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [listItems, endOfList]);

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="flex flex-col w-[100%] sm:w-[70%] self-center gap-2 sm:gap-4 p-4 bg-[#101010] rounded-lg">
          <div className="font-roboto text-[#f5c518] text-[24px] sm:text-[32px] mb-[16px] flex gap-1 sm:gap-3 font-semibold">
            <BackButton />
            {formatTitle(title)}
          </div>

          {search == "discover" && (
            <GenreListComponent type={type} genreList={setGenreList} />
          )}

          {listItems.map((item: DataInfoProps, index: number) => {
            const isLastItem = index === listItems.length - 1;

            return (
              <div
                key={index}
                ref={isLastItem ? lastItemRef : null}
                className=""
              >
                <ListItem
                  index={index}
                  key={item.id}
                  poster={item.poster_path || item.profile_path}
                  title={item.title || item.name}
                  movieId={item.id}
                  voteCount={item.vote_count}
                  year={item.release_date || item.first_air_date}
                  type={type}
                  rating={item.vote_average}
                  largeScreen={true}
                  onCancel={() => {}}
                />
              </div>
            );
          })}

          {loading && !endOfList && (
            <div className="flex w-full flex-1 justify-center">
              <Spiner />
            </div>
          )}
          {endOfList && (
            <div className="font-roboto text-[24px] text-[#F5C518] font-semibold">
              No More Results Avaliable
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default List;
