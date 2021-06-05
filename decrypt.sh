
          # Decrypt the git_deploy_key.enc key into /tmp/git_deploy_key
          openssl aes-256-cbc -d -K $REPO_ENC_KEY -iv $REPO_ENC_IV -in git_deploy_key.enc -out /tmp/git_deploy_key
          # Make sure only the current user can read the private key
          chmod 600 /tmp/git_deploy_key
          # Create a script to return the passphrase environment variable to ssh-add
          echo 'echo ${SSL_PASSPHRASE}' > /tmp/askpass && chmod +x /tmp/askpass
          # Start the authentication agent
          eval "$(ssh-agent -s)"
          # Add the key to the authentication agent
          DISPLAY=":0.0" SSH_ASKPASS="/tmp/askpass" setsid ssh-add /tmp/git_deploy_key </dev/null
          OUTPUT = "$(cat /tmp/git_deploy_key)"
          export  GITHUB_TOKEN="$OUTPUT"