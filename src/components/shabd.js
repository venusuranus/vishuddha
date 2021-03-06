import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Container from "./container";
import ApplicationCard from "./applicationCard";

const Shabd = () => {
  const data = useStaticQuery(graphql`
    query ApplicationsQuery {
      allHindiCsv {
        edges {
          node {
            id
            Word
            Alternative
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const [search, setSearch] = useState("");
  const [displayedWords] = useState(data.allHindiCsv.edges.length);

  const getAppList = () => {
    const words = data.allHindiCsv.edges.filter(({ node }) =>
      node.Word.toLowerCase().includes(
        search !== "*" ? search.toLowerCase() : ""
      )
    );
    return words;
  };

  return (
    <div className="mt-8">
      <Container>
        <div className="mt-8">
          <div className="flex justify-between items-center">
            <label
              htmlFor="word"
              className="text-lg leading-6 font-semibold text-gray-900 py-2"
            >
              Search
            </label>
            <div className="font-medium text-gray-700">
              (enter <span className="font-bold text-brand">*</span> for all{" "}
              <span className="font-bold">{displayedWords}</span> entries)
            </div>
          </div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            id="word"
            className="form-input p-3 block w-full sm:text-md sm:leading-5 rounded-md shadow-sm outline-none border border-gray-400 focus:border-purple-300"
            placeholder="Enter word here"
            aria-describedby="application-optional"
          />
        </div>
        <div className="mt-2 mb-8 py-3">
          <ul className="mt-3 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {search &&
              getAppList().map(({ node }) => (
                <li
                  className="col-span-1 flex shadow-sm rounded-md"
                  key={node.id}
                >
                  <ApplicationCard app={node} />
                </li>
              ))}
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Shabd;
