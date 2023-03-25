pipeline {
  agent any
  stages {
    stage('NPM Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

  }
}