import React from "react";
import {Box, useColorModeValue, Divider} from "@chakra-ui/react";
import {DeleteIcon, SettingsIcon} from "@chakra-ui/icons";
import "./feed-components.css";

export default function FeedComponent(props) {

  const bg = useColorModeValue('gray.300', 'gray.500');

  function deleteComponent(e) {
    e.stopPropagation();
    console.log("delete");
  }

  function editComponent(e) {
    e.stopPropagation();
    console.log("edit");
  }

  return (
    <Box
      bg={bg}
      className="outerBox"
    >
      <div className="titleBar">
        <h1 className="title">{props.title}</h1>
        <SettingsIcon className="titleIcon" onMouseDown={editComponent}/>
        <DeleteIcon className="titleIcon" onMouseDown={deleteComponent}/>
      </div>
      <hr style={{borderWidth: "0.1em"}}/>
      <div>
        {props.children}
      </div>
    </Box>
  )
}