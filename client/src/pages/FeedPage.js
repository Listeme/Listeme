import React, {useEffect, useState} from "react";
import {HStack, Button, Box, useColorModeValue} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import GridLayout from "react-grid-layout";
import './FeedPage.css';
import FeedCalender from "../components/feed-calender";
import FeedNotes from "../components/feed-notes";
import FeedTasks from "../components/feed-tasks";
import FeedPomo from "../components/feed-pomo";
import FeedBar from "../components/FeedBar";
import FeedComponent from "../components/feed-component";
import {useLazyQuery} from "@apollo/client";

function FeedPage() {
  const [layout, setLayout] = useState([
    { i: "cal", x: 0, y: 0, w: 3, h: 3 },
    { i: "task", x: 3, y: 0, w: 3, h: 3 },
    { i: "note", x: 6, y: 0, w: 3, h: 3 },
    { i: "pomo", x: 0, y: 5, w: 3, h: 3 }
  ]);

  const GET_HOME_INFO = `
    query
  `
  // const [getHomeInfo] = useLazyQuery(GET_HOME_INFO);
  async function fetchHomeSettings() {
    const response = await fetch("/api/home-settings");
    const data = await response.json();
    setLayout(data.layout);
  }

  useEffect(() => {

  }, []);

  return (
    <>
			<FeedBar/>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={visualViewport.width/ 12}
        width={visualViewport.width}
        isBounded={true}
      >
        <Box key="cal">
          <FeedComponent title="Calender">
            <FeedCalender/>
          </FeedComponent>
        </Box>
        <Box key="task">
          <FeedComponent title="Tasks">
            <FeedTasks/>
          </FeedComponent>
        </Box>
        <Box key="note">
          <FeedComponent title="Notes">
            <FeedNotes/>
          </FeedComponent>
        </Box>
        <Box key="pomo">
          <FeedComponent title="Pomodoro">
            <FeedPomo/>
          </FeedComponent>
        </Box>
      </GridLayout>
    </>
  );
}

export default FeedPage;
