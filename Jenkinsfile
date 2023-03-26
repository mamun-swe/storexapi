pipeline {
  agent any
  stages {
    stage('Checkout Code') {
      steps {
        git(url: 'https://github.com/mamun-swe/storexapi', branch: 'main')
      }
    }

    stage('Build') {
      environment {
        PORT = '5000'
        DB_URI = 'mongodb+srv://mamun_swe:KG1UciyRKg0ZcJTG@cluster0-lkz2b.mongodb.net/storex?retryWrites=true&w=majority'
        TEST_DB_URI = 'mongodb://localhost:27017/storex-test-server'
        JWT_SECRET = 'HALLOSECRET'
        ENVIRONMENT = 'DEV'
      }
      steps {
        sh 'docker-compose build'
      }
    }

  }
}