export default ({ config }) => {
    return {
    ...config,
    android: {
      googleServicesFile: process.env.GOOGLE_SERVICES_FILE,
      package: "com.lightwaves.politiquest"
        },
    }
}
