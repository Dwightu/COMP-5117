## Imports and Database Connection
import re
from mongoengine import connect
from pycoshark.mongomodels import Project, VCSSystem, Commit, FileAction, Hunk, Refactoring, IssueSystem, Issue, IssueComment, MailingList, Message
from pycoshark.utils import create_mongodb_uri_string


# You may have to update this dict to match your DB credentials
credentials = {'db_user': '',
               'db_password': '',
               'db_hostname': 'localhost',
               'db_port': 27017,
               'db_authentication_database': '',
               'db_ssl_enabled': False}

uri = create_mongodb_uri_string(**credentials)

connect('smartshark_sample', host=uri, alias='default')

## Working with commits, How many number of commits are linked to Jira
## issue tracking system? How many are bug fix commits?
project = Project.objects(name='giraph').get()
vcs_system = VCSSystem.objects(project_id=project.id).get()
print('VCS System:', vcs_system.url)
num_commits = Commit.objects(vcs_system_id=vcs_system.id).count()
print('Number of commits:', num_commits)
count_bugfix = 0
count_linked_issue = 0
for commit in Commit.objects(vcs_system_id=vcs_system.id).only('labels', 'linked_issue_ids'):
    if commit.labels is not None and 'validated_bugfix' in commit.labels and commit.labels['validated_bugfix']==True:
        count_bugfix += 1
    if commit.linked_issue_ids is not None and len(commit.linked_issue_ids)>0:
        count_linked_issue += 1
print('Number of bug fixing commits:', count_bugfix)
print('Number of commits that link to a Jira issue:', count_linked_issue)

## Working with issues
# We now select the issue tracking system of the project
issue_tracker = IssueSystem.objects(project_id=project.id).get()

print('Issue Tracker:', issue_tracker.url)

# we can now work with the issues
num_issues = Issue.objects(issue_system_id=issue_tracker.id).count()

print('Number of issues:', num_issues)

count_referenced_by_commits = 0


for issue in Issue.objects(issue_system_id=issue_tracker.id):
    if Commit.objects(linked_issue_ids=issue.id).count()>0:
        count_referenced_by_commits += 1
        
print('Number of comments in discussions:', count_comments)
print('Number of issues referenced by commits:', count_referenced_by_commits)



# We now select the mailing list of the project
# Since we have two mailing lists, we need to loop over them
mailing_lists = MailingList.objects(project_id=project.id)
for mailing_list in mailing_lists:
    print('Mailing List:', mailing_list.name)
    count_emails = Message.objects(mailing_list_id=mailing_list.id).count()
    print('Number of Emails:', count_emails)
    count_references_jira = 0
    jira_id = re.compile('GIRAPH-[0-9]+', re.I | re.M)
    for message in Message.objects(mailing_list_id=mailing_list.id):
        if message.body is not None and jira_id.search(message.body):
            count_references_jira += 1
    print('Number of emails that reference a Jira issue:', count_references_jira)