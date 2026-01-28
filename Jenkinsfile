pipeline {
  agent any

  tools {
    nodejs 'node18'
  }

  environment {
    NODE_ENV = 'ci'

    // Jenkins Credentials (Secret Text)
    WALMART_USERNAME = credentials('WALMART_USERNAME')
    WALMART_PASSWORD = credentials('WALMART_PASSWORD')
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh '''
          node -v
          npm -v
          npm ci
        '''
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
