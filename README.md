# belly-button-challenge
This repo is for week 14 module challenge.

For this challenge, firstly I use D3.json to access the data from the provided url. for the first function in app.js, I created a function to reterive the metadata of the samples and append to the index.html panel dynamically. Then in the following function which to plot the bar chart and bubble chart using plotly.js by reteriving and mapping the required objects from sample.js to create the plots. Lastly, in the init function, I use d3.select to manupulate the DOM in the html to append all the sample id to the dropdown menu, and in the optionChanged function it refers back to buildcharts and buildmetadata function.

#references:

d3.js selection documents, https://devdocs.io/d3~5/d3-selection#selection

plotly.js bubble chart, https://plotly.com/javascript/bubble-charts/

D3.js V3 full course, Datascience Weekly, https://www.youtube.com/watch?v=G-8LobMHxoI&list=PLXyk0YAcdNEGEswE3u4DdkfDoo3MZgs_9&index=1




