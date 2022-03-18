import React from "react";
import {HStack, Button, Box, useColorModeValue} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import GridLayout from "react-grid-layout";
import './FeedPage.css';
import FeedCalender from "../components/feed-calender";
import FeedNotes from "../components/feed-notes";
import FeedTasks from "../components/feed-tasks";
import FeedPomo from "../components/feed-pomo";
import FeedBar from "../components/FeedBar";

function FeedPage() {
  const layout = [
    { i: "cal", x: 0, y: 0, w: 3, h: 3 },
    { i: "task", x: 3, y: 0, w: 3, h: 3 },
    { i: "note", x: 6, y: 0, w: 3, h: 3 },
    { i: "pomo", x: 0, y: 5, w: 3, h: 3 }
  ];

  return (
    <>
			<FeedBar/>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={visualViewport.height/ 12}
        width={visualViewport.width}
        compactType={null}
      >
        <Box key="cal">
          <FeedCalender/>
        </Box>
        <Box key="task">
          <FeedTasks/>
        </Box>
        <Box key="note">
          <FeedNotes/>
        </Box>
        <Box key="pomo">
          <FeedPomo/>
        </Box>
      </GridLayout>
    </>
  );
}

export default FeedPage;
