pipeline {
  agent any
  stages {
    stage('Checkout Code') {
      steps {
        git(url: 'https://github.com/mamun-swe/storexapi', branch: 'main')
      }
    }

    stage('Build') {
      steps {
        sh 'docker-compose build'
      }
    }

  }
}