if (window.mkpGoogleScriptValidation != "running") {
  console.log("Running Google Reviews Script Updated");

  window.mkpGoogleScriptValidation = "running";

  window.runScriptGoogleReviews = function () {
    //*** Global Variables - Start */
    // main endpoints
    const cdnBaseUrl =
      "https://mkp-prod.nyc3.cdn.digitaloceanspaces.com/google-reviews";
    const backendUrl = "https://reviews-cache-proxy-ajr57c2s7q-ue.a.run.app";
    const appId = "f20b0377-bc3e-418d-9d73-2ac147543483";
    const instanceId = document
      .getElementById("mkp_gg_reviews_script")
      .src.split("instance_id=")[1];
    const vueScriptUrl = cdnBaseUrl + "/vue_widget/app.js"; // should placed in 'vue_widget/' directory

    const MKPGlobalVars = {
      cdnUrl: cdnBaseUrl,
      appId: appId,
      backendUrl: backendUrl,
      instanceId: instanceId,
    };

    var MKPAfHttpClient = function () {
      this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
          if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
            aCallback(anHttpRequest.responseText);
        };
        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
      };
    };

    // Reviews data
    let filteredReviews = [];
    let reviewsStatistics = {
      reviews_count: 0,
      star_count: 0,
      overall_rating: "0.0",
    };
    let filterOptions = {
      review_filter: "all",
      widget_flow: "only-badge",
      open_behavior: "click",
    };

    let widgetData = [
      {
        xxs: [
          {
            widgetName: "review-widget_teaser",
            displayName: "Widget container",
            styles: {
              L_Bg_Padding: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              },
              D_Bg_PrimaryColor: "rgba(255, 255, 255, 0)",
              L_Btn_Direction: "horizontal",
              L_MinHeight: 40,
              ani_ShowAfter: 1.5,
              position_Left: 12,
              D_Bg_SecondaryColor: "rgba(46, 129, 255, 1)",
              position_Right: "unset",
              L_Bg_MobilePadding: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              },
              L_ElementGap: 0,
              L_MaxHeight: 300,
              position_Bottom: 12,
              ani_Type: "fade",
              D_Bg_Blur: 0,
              position_Top: "unset",
              D_Bg_BdrWidth: 0,
              L_Bg_CRadius: 6,
              D_Bg_BdrColor: "rgb(255, 255, 255)",
              position: "left-bottom",
              D_Bg_Enable_Gradient: false,
              L_MaxWidth: 320,
              L_Bdg_MobileLayout: "default-badge",
              mobilePosition: "center-bottom",
              L_Btn_MobileDirection: "horizontal",
              mobilePosition_Left: 0,
              mobilePosition_Right: 0,
              mobilePosition_Top: "unset",
              mobilePosition_Bottom: 12,
            },
            id: "container",
            type: "widget",
          },
          {
            iconName: "builder/icon-element-image",
            displayName: "Review badge",
            moved: false,
            h: 6,
            description: "HTML <img> tag",
            i: "1",
            label: "Review badge",
            type: "review_badge",
            bdg_text_afterReviewCount: "REVIEWS",
            w: 4,
            x: 0,
            y: 0,
            styles: {
              D_Bdg_Enable_Gradient: false,
              D_Label_TextColor: "#f7802f",
              D_Bdg_SecondaryColor: "rgb(255, 255, 255)",
              L_Bdg_Template: "bdg_3",
              D_Bdg_BdrColor: "#e5e5e5",
              D_Bdg_IconFB_Color: "#1976d2",
              D_TextColor: "rgba(0, 0, 0, 1)",
              D_Label_FontSize: 18,
              L_Bdg_IconStr_Gap: 0,
              D_Label_Font_Formats: [],
              D_Label_TextFont: "Poppins",
              D_Bdg_IconStrOff_Color: "#d9d9d9",
              D_Bdg_Logo: "original_logo",
              D_FontSize: 12,
              L_Bdg_IconStr_Size: 25,
              L_Bdg_ElementGap: 0,
              D_BdgStars_Color: "rgba(255, 56, 92,1)",
              L_Bdg_IconFB_Size: 42,
              D_Bdg_BdrWidth: 1,
              D_ColorScheme: "color_1",
              D_Bdg_IconStrOn_Color: "#f7802f",
              D_Font_Formats: [],
              D_Bdg_PrimaryColor: "rgb(255, 255, 255)",
              L_Bdg_Radius: 6,
              L_Bdg_Padding: {
                top: 6,
                left: 12,
                bottom: 6,
                right: 12,
              },
              D_TextFont: "Poppins",
              L_Bdg_Icon_Size: 42,
            },
            id: "review_badge_0",
            reviews_overall: {
              overall_rating: "5",
              star_count: "158",
              reviews_count: "100",
            },
          },
        ],
        lg: [
          {
            widgetName: "review-widget_teaser",
            displayName: "Widget container",
            styles: {
              L_Bg_Padding: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              },
              D_Bg_PrimaryColor: "rgba(255, 255, 255, 0)",
              L_Btn_Direction: "horizontal",
              L_MinHeight: 40,
              ani_ShowAfter: 1.5,
              position_Left: 12,
              D_Bg_SecondaryColor: "rgba(46, 129, 255, 1)",
              position_Right: "unset",
              L_Bg_MobilePadding: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              },
              L_ElementGap: 0,
              L_MaxHeight: 300,
              position_Bottom: 12,
              ani_Type: "fade",
              D_Bg_Blur: 0,
              position_Top: "unset",
              D_Bg_BdrWidth: 0,
              L_Bg_CRadius: 6,
              D_Bg_BdrColor: "rgb(255, 255, 255)",
              position: "left-bottom",
              D_Bg_Enable_Gradient: false,
              L_MaxWidth: 320,
              L_Bdg_MobileLayout: "default-badge",
              mobilePosition: "center-bottom",
              L_Btn_MobileDirection: "horizontal",
              mobilePosition_Left: 0,
              mobilePosition_Right: 0,
              mobilePosition_Top: "unset",
              mobilePosition_Bottom: 12,
            },
            id: "container",
            type: "widget",
          },
          {
            iconName: "builder/icon-element-image",
            displayName: "Review badge",
            moved: false,
            h: 6,
            description: "HTML <img> tag",
            i: "1",
            label: "Review badge",
            type: "review_badge",
            bdg_text_afterReviewCount: "REVIEWS",
            w: 4,
            x: 0,
            y: 0,
            styles: {
              D_Bdg_Enable_Gradient: false,
              D_Label_TextColor: "#f7802f",
              D_Bdg_SecondaryColor: "rgb(255, 255, 255)",
              L_Bdg_Template: "bdg_3",
              D_Bdg_BdrColor: "#e5e5e5",
              D_Bdg_IconFB_Color: "#1976d2",
              D_TextColor: "rgba(0, 0, 0, 1)",
              D_Label_FontSize: 18,
              L_Bdg_IconStr_Gap: 0,
              D_Label_Font_Formats: [],
              D_Label_TextFont: "Poppins",
              D_Bdg_IconStrOff_Color: "#d9d9d9",
              D_Bdg_Logo: "original_logo",
              D_FontSize: 12,
              L_Bdg_IconStr_Size: 25,
              L_Bdg_ElementGap: 0,
              D_BdgStars_Color: "rgba(255, 56, 92,1)",
              L_Bdg_IconFB_Size: 42,
              D_Bdg_BdrWidth: 1,
              D_ColorScheme: "color_1",
              D_Bdg_IconStrOn_Color: "#f7802f",
              D_Font_Formats: [],
              D_Bdg_PrimaryColor: "rgb(255, 255, 255)",
              L_Bdg_Radius: 6,
              L_Bdg_Padding: {
                top: 6,
                left: 12,
                bottom: 6,
                right: 12,
              },
              D_TextFont: "Poppins",
              L_Bdg_Icon_Size: 42,
            },
            id: "review_badge_0",
            reviews_overall: {
              overall_rating: "5",
              star_count: "158",
              reviews_count: "100",
            },
          },
        ],
      },
    ];

    let widgetVisibility = {
      visibility_status: true,
      visibility_option: "home-only",
      pathList: [],
    };
    let subscriptionPlan = "Free";
    let connectedPage = {
      id: "",
      name: "",
      listingName: "",
      profilePictureURL: "",
    };

    // Permission keys
    let isPreviewMode = false;
    /** flag use for hide widget in dashboard app web previews */
    let isWidgetDataAvailable = true;
    // Detect initial page from URL to prevent widget flickering
    let isHomePage =
      window.location.pathname === "/" || window.location.pathname === "";
    const FREE_SITE_HOME_PAGE_PATH_LENGTH = 2;
    //*** Global Variables - End */

    // Run functions
    console.log("🚀 Initializing Google Reviews Widget");

    bindGlobalVariables();
    bindVueWidget();
    mkpFetchReviewsData();
    // checkAndAddWidgets();

    //*** Functions - Start */
    function bindGlobalVariables() {
      //Add main/global variables into head
      const MKPGlobalVarsScript = document.createElement("script");
      MKPGlobalVarsScript.setAttribute(
        "MkpGoogleReviewsGlobalVars",
        JSON.stringify(MKPGlobalVars)
      );
      MKPGlobalVarsScript.id = "MKP-GOOGLE-REVIEWS-GLOBAL-VARS";
      document.head.appendChild(MKPGlobalVarsScript);
    }

    function checkUrlForPath(pathFragments) {
      // Combine pathname and search (e.g., "/products?id=123")
      const fullCurrentPath = (window.location.pathname + window.location.search).toLowerCase();
      return pathFragments?.some(fragment => {
        const normalizedFragment = fragment.toLowerCase().trim();

        // Strict check for root path
        if (normalizedFragment === "/") {
          return window.location.pathname === "/";
        }

        // Checks if the fragment exists anywhere in the path or query string
        return fullCurrentPath.includes(normalizedFragment);
      });
    }

    function bindVueWidget() {
      //Add vue widget .js and .css file into the head
      const MKPImportedVueComps = document.createElement("script");
      MKPImportedVueComps.src = vueScriptUrl;
      document.head.appendChild(MKPImportedVueComps);
    }

    function isFreeWixSite() {
      const hostname = new URL(window.location.href).hostname;

      // Check for standard Wix and Wix Studio free domains
      const freeSuffixes = [
        'wixsite',
        'wixstudio',
        'editorx'
      ];

      return freeSuffixes.some(suffix => hostname.includes(suffix));
    };

    function mkpRegisterListener() {
      console.log("📊 Registering Wix Analytics listener");
      window.wixDevelopersAnalytics.register(
        MKPGlobalVars.appId,
        (eventName, eventParams) => {
          switch (eventName) {
            case "PageView":
              const pagePath = eventParams.pagePath;
              if (
                (isFreeWixSite() && window.location.pathname.split('/').length === FREE_SITE_HOME_PAGE_PATH_LENGTH) // free site home page check
                || pagePath === "/" // premium site home page check
              ) {
                isHomePage = true;
              } else {
                isHomePage = false;
              }
              break;
            case "ViewContent":
              //isHomePage = pagePath === "/";
              //checkAndAddWidgets();
              break;
          }
        }
      );
    }

    function mkpFetchReviewsData() {
      const backendUrl = MKPGlobalVars.backendUrl;
      const instance_id = `instance_id=${MKPGlobalVars.instanceId}`;
      sessionStorage.setItem('hideGoogleReviewsWidget', false);
      const getReviewsDataUrl = `${backendUrl}/getMemberReviewsData?${instance_id}`;
      const mkpGetClient = new MKPAfHttpClient();

      function httpGetJson(url, timeout = 10000) {
        return new Promise((resolve, reject) => {
          let finished = false;
          mkpGetClient.get(url, function (res) {
            if (finished) return;
            finished = true;
            try {
              const parsed = JSON.parse(res);
              resolve(parsed);
            } catch (err) {
              reject(err);
            }
          });
          setTimeout(() => {
            if (finished) return;
            finished = true;
            reject(new Error('timeout'));
          }, timeout);
        });
      }

      httpGetJson(getReviewsDataUrl)
        .then(reviewsData => {
          if (reviewsData) {
            filteredReviews = reviewsData.filtered_reviews || filteredReviews;
            reviewsStatistics = reviewsData.reviews_statistics || reviewsStatistics;
            filterOptions = reviewsData.filter_options || filterOptions;
            widgetVisibility = reviewsData.widget_visibility || widgetVisibility;
            subscriptionPlan = reviewsData.subscription_plan || subscriptionPlan;
            connectedPage = reviewsData.fb_page || connectedPage;

            const backend_widgetData = reviewsData.widget_data;

            if (backend_widgetData && Array.isArray(backend_widgetData) && backend_widgetData.length > 0) {
              widgetData = backend_widgetData;
              isWidgetDataAvailable = true;
            } else {
              console.warn("⚠️ No widget_data from backend, using defaults");
              isWidgetDataAvailable = false;
            }
          }
        })
        .catch(err => {
          // Handles both network errors and JSON parsing errors
          console.error("❌ Failed to fetch reviews data:", err);
        })
        .finally(() => {
          // Ensures widgets try to load even if the fetch fails
          checkAndAddWidgets();
        });
    }

    function checkAndAddWidgets() {
      mkpRemoveWidget();
      const isWidgetActive = widgetVisibility.visibility_status === true;
      // disable this validation, allowing users to see the widget even no reviews available
      // const isDataReady =
      //   filteredReviews.length > 0 && reviewsStatistics.reviews_count > 0;
      const visibleOnlyInHomePage =
        widgetVisibility.visibility_option === "home-only";
      const visibleOnSpecificPage =
        widgetVisibility.visibility_option === 'specific-pages';
      const isWidgetVisibleOnSpecificURLPath = checkUrlForPath(widgetVisibility.pathList);

      // Check all conditions - order matters
      if (!isWidgetActive) {
        console.log("❌ Widget hidden - visibility disabled by user");
        return;
      }

      if (!isWidgetDataAvailable) {
        console.log("❌ Widget hidden - no widget configuration available");
        return;
      }

      if (isPreviewMode) {
        console.log("❌ Widget hidden - preview mode active");
        return;
      }

      // disable this validation, allowing users to see the widget even no reviews available
      // if (!isDataReady) {
      //   console.log("❌ Widget hidden - no reviews data (count:", reviewsStatistics.reviews_count, ")");
      //   return;
      // }

      // Show widget based on paths set by users
      if (visibleOnSpecificPage && isWidgetVisibleOnSpecificURLPath) {
        mkpShowReviewsWidget();
        return;
      }
      if (visibleOnSpecificPage && !isWidgetVisibleOnSpecificURLPath) {
        mkpRemoveWidget();
        return;
      }

      // Show widget based on visibility settings
      if (visibleOnlyInHomePage) {
        // Only show on home page
        if (isHomePage) {
          mkpShowReviewsWidget();
        } else {
          mkpRemoveWidget();
        }
      } else {
        // Show on all pages
        mkpShowReviewsWidget();
      }
    }

    function mkpShowReviewsWidget() {
      // Validate widget data structure before creating element
      if (!widgetData || widgetData.length < 2) {
        console.error("❌ Cannot create widget - invalid widgetData structure");
        return;
      }

      let reviewsWidget = document.createElement("mkp-google-reviews");

      console.log("🏗️ Creating widget element with data:", {
        reviews: filteredReviews.length,
        rating: reviewsStatistics.overall_rating,
        widget_flow: filterOptions.widget_flow,
        open_behavior: filterOptions.open_behavior,
      });

      reviewsWidget.setAttribute("reviewdata", JSON.stringify(filteredReviews));
      reviewsWidget.setAttribute(
        "reviewsstatistics",
        JSON.stringify(reviewsStatistics)
      );
      reviewsWidget.setAttribute(
        "filterreviews",
        JSON.stringify(filterOptions)
      );
      reviewsWidget.setAttribute(
        "connectedpage",
        JSON.stringify(connectedPage)
      );

      // Widget data: [0] = main modal, [1] = teaser badge
      const mainModalStyleData = JSON.stringify(widgetData[0]);
      const teaserStyleData = JSON.stringify(widgetData[1]);
      reviewsWidget.setAttribute("mainstyledata", mainModalStyleData);
      reviewsWidget.setAttribute("teaserstyledata", teaserStyleData);

      document.body.appendChild(reviewsWidget);

      // Verify widget was added to DOM
      setTimeout(() => {
        const widgetExists = document.querySelector("mkp-google-reviews");
        if (widgetExists) {
          console.log("🔎 Widget verification: ✅ Found in DOM");
        } else {
          console.warn("⚠️ Widget verification: Widget not found in DOM after creation");
        }
      }, 100);
    }

    function mkpRemoveWidget() {
      let reviewsWidget = document.querySelector("mkp-google-reviews");
      if (reviewsWidget) {
        reviewsWidget.remove();
        console.log("🗑️ Widget removed from page");
      }
    }

    function previewScreenCheckEvent(event) {
      // remove widget in preview mode
      if (event.data.action === "mkpHideWidget") {
        console.log("👁️ Preview mode detected - hiding widget");
        isPreviewMode = true;
        mkpRemoveWidget();
      }
    }

    //*** Functions - End */

    // check is widget page in the preview mode
    window.addEventListener("message", previewScreenCheckEvent);

    // Remove the event listener after 15 seconds
    setTimeout(() => {
      window.removeEventListener("message", previewScreenCheckEvent);
      console.log("⏱️ Preview mode event listener removed after 16s");
    }, 16000);

    // Register analytics listener
    if (window.wixDevelopersAnalytics) {
      console.log("✅ Wix Analytics already available");
      mkpRegisterListener();
    } else {
      console.log("⏳ Waiting for Wix Analytics to be ready...");
      window.addEventListener(
        "wixDevelopersAnalyticsReady",
        mkpRegisterListener
      );
    }
  };

  window.runScriptGoogleReviews();
}
