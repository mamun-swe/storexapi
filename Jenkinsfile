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

    stage('Run dev mode') {
      steps {
        sh 'npm run dev'
      }
    }

  }
}