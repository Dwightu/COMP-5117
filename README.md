# COMP-5117 Software Mining Repository
This repository is the final project for course <a href="http://olgabaysal.com/teaching/fall22/comp5117_f22.html">COMP-5117</a>, supervised by Prof. Olga.

## Introduction
Agile software development have been widely adopted by many large companies, such as Apple, Microsoft, and IBM. Jira is a proprietary issue tracking product developed
by Atlassian that allows bug tracking and agile project
management. Jira software is popular in the agile world due to
its well-managed workflow mapping and issue tracking ability.
At the same time, there has been growing criticism that users do
not correctly utilize Jira as agile software development tool. To
understand good and bad practices in an agile team who use Jira
as issue tracking tools, we studied the datasets from
smartSHARK on a repository called Giraph. We present a
detailed analysis of their behaviors that impact work efficiency.
We also propose a set of best practices that can help agile team
better utilize agile methodology and Jira and discuss open
challenges that require further research and development.

## Usage
1. First, you need to prepare a local database for analysis. This requires about 650 GB of free disk space! Our test enviornment is <a href="https://aws.amazon.com/ec2/">AWS EC2</a>.
2. Download release of the <a href="https://smartshark.github.io/dbreleases/">SmartSHARK 2.1 MongoDB</a>.
```
wget -O smartshark_2_1.agz http://141.5.100.155/smartshark_2_1.agz
# download the following archive for the small version without code clones and code metrics, which only requires about 90 GB of free disk space
# wget -O smartshark_2_1.agz http://141.5.100.155/smartshark_2_1_small.agz
wget -qO - https://www.mongodb.org/static/pgp/server-4.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl daemon-reload
sudo systemctl start mongod
mongorestore --gzip --archive=smartshark_2_1.agz
```
3. Run ...
4. Run ...


## Useful links
<a href="https://smartshark.github.io/dbreleases/">SmartSHARK</a><br>
<a href="https://giraph.apache.org/">Giraph</a><br>
