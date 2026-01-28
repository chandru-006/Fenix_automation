pipeline {
  agent any

  tools {
    nodejs 'node18'
  }

  environment {
    NODE_ENV = 'ci'
    BASE_URL = 'https://fenix-wmconnector.sigmainfo.net/oauth/index'
    WALMART_USERNAME = 'test@sigma.com'
    WALMART_PASSWORD = 'Sigma@123'
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
      steps {
        sh 'npx playwright test'
      }
    }
  }

  post {
    always {
      script {
        if (fileExists('allure-results')) {
          allure(
            includeProperties: false,
            jdk: '',
            results: [[path: 'allure-results']]
          )
        }
      }
    }

    failure {
      echo '❌ Automation failed. Build blocked.'
    }

    success {
      echo '✅ Automation passed.'
    }
  }
}
