pipeline {
  agent any

  environment {
    NODE_ENV = 'ci'
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        sh 'npx playwright install --with-deps chromium'
      }
    }

    stage('Run Tests') {
      environment {
        WALMART_USERNAME = credentials('WALMART_USERNAME')
        WALMART_PASSWORD = credentials('WALMART_PASSWORD')
      }
      steps {
        sh 'npx playwright test'
      }
    }
  }

  post {
    always {
      allure(
        includeProperties: false,
        jdk: '',
        results: [[path: 'allure-results']]
      )
    }

    failure {
      echo '❌ Automation failed. Build blocked.'
    }

    success {
      echo '✅ Automation passed.'
    }
  }
}
