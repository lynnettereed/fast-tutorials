# Lesson 01 - Learning the basics
Getting your environment up and running with the basic global applications and configurations required for web development.

## Install and configure Git
1. Install the latest stable versions of [Git](https://git-scm.com/download).
2. Configure git user credentials for [every respository](https://help.github.com/articles/setting-your-username-in-git/#setting-your-git-username-for-every-repository-on-your-computer) or [single repository](https://help.github.com/articles/setting-your-username-in-git/#setting-your-git-username-for-a-single-repository) as shown:
    - Set user name:
        ```bash
        $ git config user.name "Jane Doe"
        ```
    - Set user email:
        ```bash
        $ git config user.email "jane.doe@email.com"
        ```
    - Set credential manager:
        - For Mac:
            ```bash
            $ git config credential.helper osxkeychain
            ```
        - For Windows:
            ```bash
            $ git config credential.helper wincred
            ```
    - Set configuration so renaming files is a tracked change:
        ```bash
        $ git config core.ignorecase false
        ```

## Install and configure Node
1. Install the LTS - Long Term Supported version of [Node](https://nodejs.org/en).