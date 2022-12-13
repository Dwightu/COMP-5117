console.log("Data Analysis for issue Tracking");
const arguments = process.argv.splice(2);;
const fs = require("fs");
const originalFileName = arguments[0] || "./search.json";
let data = JSON.parse(fs.readFileSync(originalFileName));
console.log(data.issues.length);

// filter unnecessary segments
data.issues.forEach(item => {
  for (key in item.fields) {
    if (key.includes("customfield")) {
      delete item.fields[key];
    }
  }
});

// write file
const outputFileName = arguments[1] || "./cleaned.json";
fs.writeFile(outputFileName, JSON.stringify(data), (err) => {
    if (err) return console.error(err);
    console.log("Data saved");
});

// Priority count
const priorityCount = {};
data.issues.forEach(issue => {
  const priority = issue.fields.priority.name;
  if (!priorityCount[priority]) {
    priorityCount[priority] = 1;
  } else {
    priorityCount[priority]++;
  }
});
console.log(priorityCount);

// type count
const typeCount = {};
data.issues.forEach(issue => {
  const type = issue.fields.issuetype.name;
  if (!typeCount[type]) {
    typeCount[type] = 1;
  } else {
    typeCount[type]++;
  }
});
console.log(typeCount);

// priority and type count
const priorityTypeCount = {};
const typePriorityCount = {};
data.issues.forEach(issue => {
  const priority = issue.fields.priority.name;
  const type = issue.fields.issuetype.name;
  priorityTypeCount[priority] = priorityTypeCount[priority] || {};
  priorityTypeCount[priority][type] = priorityTypeCount[priority][type] || 0;
  priorityTypeCount[priority][type]++;
  typePriorityCount[type] = typePriorityCount[type] || {};
  typePriorityCount[type][priority] = typePriorityCount[type][priority] || 0;
  typePriorityCount[type][priority]++;
});
console.log(priorityTypeCount);
console.log(typePriorityCount);

// ticket_asignee
const assigneeCount = {};
data.issues.forEach(issue => {
  const assignee = issue.fields.assignee;
  if (assignee) {
    if (!assigneeCount[assignee.displayName]) {
      assigneeCount[assignee.displayName] = 1;
    } else {
      assigneeCount[assignee.displayName]++;
    }
  } else {
    if (!assigneeCount["Unassigned"]) {
      assigneeCount["Unassigned"] = 1;
    } else {
      assigneeCount["Unassigned"]++;
    }
  }
});
console.log(assigneeCount);

// creator_priority
const creatorCount = {};
const creatorPriorityCount = {};
data.issues.forEach(issue => {
  const creator = issue.fields.creator.displayName;
  const priority = issue.fields.priority.name;
  if (!creatorCount[creator]) {
    creatorCount[creator] = 1;
  } else {
    creatorCount[creator]++;
  }
  creatorPriorityCount[creator] = creatorPriorityCount[creator] || {};
  creatorPriorityCount[creator][priority] = creatorPriorityCount[creator][priority] || 0;
  creatorPriorityCount[creator][priority]++;
});
console.log(creatorCount);
console.log(creatorPriorityCount);

// watch count and priority
const watchCountPriorityCount = {};
const priorityWatchCountCount = {};
data.issues.forEach(issue => {
  const watchCount = issue.fields.watches.watchCount;
  const priority = issue.fields.priority.name;
  watchCountPriorityCount[watchCount] = watchCountPriorityCount[watchCount] || {};
  watchCountPriorityCount[watchCount][priority] = watchCountPriorityCount[watchCount][priority] || 0;
  watchCountPriorityCount[watchCount][priority]++;
  priorityWatchCountCount[priority] = priorityWatchCountCount[priority] || {};
  priorityWatchCountCount[priority][watchCount] = priorityWatchCountCount[priority][watchCount] || 0;
  priorityWatchCountCount[priority][watchCount]++;
});
console.log(watchCountPriorityCount);
console.log(priorityWatchCountCount);

// unresolved ticket
const resolutionDateCount = {};
const priorityResolutionDateCount = {};
const priorityResolutionDateAverage = {};
data.issues.forEach(issue => {
  const resolutionDate = issue.fields.resolutiondate;
  const priority = issue.fields.priority.name;
  if (resolutionDate) {
    if (!resolutionDateCount[priority]) {
      resolutionDateCount[priority] = 1;
    } else {
      resolutionDateCount[priority]++;
    }
    priorityResolutionDateCount[priority] = priorityResolutionDateCount[priority] || [];
    const start = new Date(issue.fields.created);
    const end = new Date(resolutionDate);
    const diff = (end.getTime() - start.getTime())/1000/60/60;
    priorityResolutionDateCount[priority].push(diff);
  }
});
console.log(resolutionDateCount);
console.log(priorityResolutionDateCount);
Object.keys(priorityResolutionDateCount).forEach(priority => {
  const sum = priorityResolutionDateCount[priority].reduce((a, b) => a + b, 0);
  const average = sum / priorityResolutionDateCount[priority].length;
  priorityResolutionDateAverage[priority] = average;
});
console.log(priorityResolutionDateAverage);
