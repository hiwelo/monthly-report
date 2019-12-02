# monthlyReport

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

Helper to extract all issues and pull requests closed for the requested
repository and assignee since the requested timestamp

This tool is getting the information from the GitHub API, based on information
provided as CLI flags and/or environment variables

# Usage

```sh
monthlyReport --assignee=hiwelo --month=2019-11 --repository=hiwelo/monthly-report --token=${TOKEN}
```

These information can also be part of a `.env` file at the root of the repository like:

```
assignee=hiwelo
repository=hiwelo/monthly-report
token=AUTH_TOKEN
```
