function isTablet(userAgent = window.navigator.userAgent){
  return /ipad|Nexus (7|9)|xoom|sch-i800|playbook|tablet|kindle/i.test(userAgent);
}