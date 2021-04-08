/**
 * @file The main entry point for the application.
 */

import { Router, RouterConfiguration } from 'aurelia-router';
import 'bootstrap';
import 'bs4-toast';
import 'jquery';
import { PagePreRender } from './lib/page-pre-render';
import { PagePostRender } from './lib/page-post-render';
import { PagePreActivate } from './lib/page-pre-activate';

export class App {

  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {

    // Set the default title.
    config.title = 'Adapop';

    // Set the pushState so that we don't have to use hashes in the URL.
    config.options.pushState = true;

    // Add in the pipeline steps.
    config.addPipelineStep('preActivate', PagePreActivate);
    config.addPipelineStep('preRender', PagePreRender);
    config.addPipelineStep('postRender', PagePostRender);
    //config.addPipelineStep('authorize', PageAuthorization);

    // Route configuration.
    config.map([
      // --formatter:off
      { route: '', redirect: 'home' },
      { route: 'home', name: 'home', moduleId: 'routes/home/index-view', nav: true, title: 'My home' }
      //{ route: [ 'topics/config', 'topics/config/:_id' ], href: '#topics', name: 'topic-config', moduleId: 'routes/topics/config-view', nav: true, title: 'Topic Configuration', auth: true },
      //{ route: 'contact', name: 'contact', moduleId: 'routes/contact/index-view', nav: true, title: 'Contact Us', auth: false },
      //{ route: 'profile', name: 'profile', moduleId: 'routes/profile/index-view', nav: true, title: 'Profile', auth: true },
      //{ route: 'terms', name: 'terms', moduleId: 'routes/terms/index-view', nav: true, title: 'Terms of Service', auth: false },
      //{ route: 'privacy', name: 'privacy', moduleId: 'routes/privacy-policy/index-view', nav: true, title: 'Privacy Policy', auth: false },
      //{ route: 'sign-up', name: 'sign-up', moduleId: 'routes/sign-up/index-view', nav: true, title: 'Sign Up', auth: false },
      //{ route: 'login', name: 'login', moduleId: 'routes/login/index-view', nav: true, title: 'Login', auth: false },
      //{ route: 'logout', name: 'logout', moduleId: 'routes/logout/index-view', nav: true, title: 'Logout', auth: true }
      // --formatter:on
    ]);

    config.mapUnknownRoutes(() => {
      // --formatter:off
      return { auth: false, moduleId: 'routes/not-found-view', name: 'not-found', route: 'not-found', title: '404 - Web page not found' };
      // --formatter:on
    });

    this.router = router;
  }
}
