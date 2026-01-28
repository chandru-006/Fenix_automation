pipeline {
  agent any

  tools {
    nodejs 'node18'
  }

  environment {
    BASE_URL = 'https://your-env-url'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'npm ci'
        sh 'npx playwright install --with-deps'
      }
    }

    stage('Test') {
      steps {
        sh 'npx playwright test'
      }
    }
  }

  post {
    always {
      allure results: [[path: 'allure-results']]
    }
    failure {
      error('Automation failed. Build blocked.')
    }
  }
}
