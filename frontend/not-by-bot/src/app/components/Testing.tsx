"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import supabase from "../../../supabase";
import { FaEye } from "react-icons/fa";

type TestingProps = {
  data: string; // Assuming genre_text is a string
};

const Testing: React.FC<TestingProps> = ({ data }) => {
  const [like, setLiked] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [fetchedData, setFetchedData] = useState([null]);
  const [filter, setFilter] = useState("title");
  const [totalResults, setTotalResults]=useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: all_content, error } = await supabase
          .from("all_content")
          .select("*")
          .eq("content_genre", data);

        if (all_content) {
          setFetchedData(all_content);
          setTotalResults(all_content.length)
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  //   useEffect(() => {
  //     console.log("filter changed");
  //   }, [filter]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="mt-4 flex items-center">
        <Input
          color="default"
          type="text"
          variant="bordered"
          label="Search"
          className="text-white"
          onValueChange={setSearchText}
        />

        <div className="ml-2">
          <Dropdown >
            <DropdownTrigger>
              <Button variant="solid" color="default" size="lg">
                Filter
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Static Actions"
              onAction={(key) => setFilter(key + "")}
            >
              <DropdownItem key="title" className="text-black">
                Search By Title
              </DropdownItem>
              <DropdownItem key="author" className="text-black">
                Search By Author
              </DropdownItem>
              <DropdownItem key="likes" className="text-black">
                Sort By Likes
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className="ml-2">
          <Button variant="light" color="warning" size="lg">
            Search
          </Button>
        </div>
      </div>

      <div style={{display: 'flex', alignItems: 'center', marginTop: 10}}>
        <FaEye color="#edbc1b"/>
        <p className="ml-2">Searching by {filter}</p>
      </div>

      <p style={{fontSize: 25, fontFamily: 'cursive', marginTop: 50}}>Found {totalResults} Results</p>

        
    </div>
  );
};

export default Testing;
