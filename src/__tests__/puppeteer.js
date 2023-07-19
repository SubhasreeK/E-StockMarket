//import fs from 'fs';
fs = require('fs');
//openc = require("fix-esm").require('open');
puppeteer = require('puppeteer');
const {startFlow} = require('lighthouse/lighthouse-core/fraggle-rock/api.js');
desktopConfig = require('lighthouse/lighthouse-core/config/desktop-config.js');
// import open from 'open';
// import puppeteer from 'puppeteer';
// import {startFlow} from 'lighthouse/lighthouse-core/fraggle-rock/api.js';
// import desktopConfig from 'lighthouse/lighthouse-core/config/desktop-config.js';
async function lighthousecheck () {
  const browser = await puppeteer.launch({headless:true});
  const page = await browser.newPage();
  const timeout = 30000;
  page.setDefaultTimeout(timeout);

  const flags = {
      screenEmulation: {
          disabled: true
      }
  }
  const config = desktopConfig;
  const lhFlow = await startFlow(page, {name: 'newPuppeteer', config, flags});
  {
      const targetPage = page;
      await targetPage.setViewport({
          width: 1519,
          height: 229
      })
  }
  await lhFlow.navigate('https://pptr.dev/');
  {
      const targetPage = page;
      const promises = [];
      promises.push(targetPage.waitForNavigation());
      await targetPage.goto('https://pptr.dev/');
      await Promise.all(promises);
  }
  //await lhFlow.endNavigation();
  await lhFlow.startTimespan({stepName: 'puppeteerAPI'});
  {
      const targetPage = page;
      await scrollIntoViewIfNeeded([
          'aria/Puppeteer API',
          'text/Puppeteer API'
      ], targetPage, timeout);
      const element = await waitForSelectors([
          'aria/Puppeteer API',
          'text/Puppeteer API'
      ], targetPage, { timeout, visible: true });
      await element.click({
        offset: {
          x: 86.6875,
          y: 15.199999809265137,
        },
      });
  }
  {
      const targetPage = page;
      await scrollIntoViewIfNeeded([
          'aria/@puppeteer/browsers API',
          'text/@puppeteer/browsers'
      ], targetPage, timeout);
      const element = await waitForSelectors([
          'aria/@puppeteer/browsers API',
          'text/@puppeteer/browsers'
      ], targetPage, { timeout, visible: true });
      await element.click({
        offset: {
          x: 127.44998168945312,
          y: 16.199999809265137,
        },
      });
  }
  await lhFlow.endTimespan();
  //const lhFlowReport = await lhFlow.generateReport();
  //fs.writeFileSync('testflow.report.html', lhFlowReport)
  //openc('testflow.report.html', {wait: false});
  await browser.close();

  async function waitForSelectors(selectors, frame, options) {
    for (const selector of selectors) {
      try {
        return await waitForSelector(selector, frame, options);
      } catch (err) {
        console.error(err);
      }
    }
    throw new Error('Could not find element for selectors: ' + JSON.stringify(selectors));
  }

  async function scrollIntoViewIfNeeded(selectors, frame, timeout) {
    const element = await waitForSelectors(selectors, frame, { visible: false, timeout });
    if (!element) {
      throw new Error(
        'The element could not be found.'
      );
    }
    await waitForConnected(element, timeout);
    const isInViewport = await element.isIntersectingViewport({threshold: 0});
    if (isInViewport) {
      return;
    }
    await element.evaluate(element => {
      element.scrollIntoView({
        block: 'center',
        inline: 'center',
        behavior: 'auto',
      });
    });
    await waitForInViewport(element, timeout);
  }

  async function waitForConnected(element, timeout) {
    await waitForFunction(async () => {
      return await element.getProperty('isConnected');
    }, timeout);
  }

  async function waitForInViewport(element, timeout) {
    await waitForFunction(async () => {
      return await element.isIntersectingViewport({threshold: 0});
    }, timeout);
  }

  async function waitForSelector(selector, frame, options) {
    if (!Array.isArray(selector)) {
      selector = [selector];
    }
    if (!selector.length) {
      throw new Error('Empty selector provided to waitForSelector');
    }
    let element = null;
    for (let i = 0; i < selector.length; i++) {
      const part = selector[i];
      if (element) {
        element = await element.waitForSelector(part, options);
      } else {
        element = await frame.waitForSelector(part, options);
      }
      if (!element) {
        throw new Error('Could not find element: ' + selector.join('>>'));
      }
      if (i < selector.length - 1) {
        element = (await element.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
      }
    }
    if (!element) {
      throw new Error('Could not find element: ' + selector.join('|'));
    }
    return element;
  }

  async function waitForElement(step, frame, timeout) {
    const {
      count = 1,
      operator = '>=',
      visible = true,
      properties,
      attributes,
    } = step;
    const compFn = {
      '==': (a, b) => a === b,
      '>=': (a, b) => a >= b,
      '<=': (a, b) => a <= b,
    }[operator];
    await waitForFunction(async () => {
      const elements = await querySelectorsAll(step.selectors, frame);
      let result = compFn(elements.length, count);
      const elementsHandle = await frame.evaluateHandle((...elements) => {
        return elements;
      }, ...elements);
      await Promise.all(elements.map((element) => element.dispose()));
      if (result && (properties || attributes)) {
        result = await elementsHandle.evaluate(
          (elements, properties, attributes) => {
            for (const element of elements) {
              if (attributes) {
                for (const [name, value] of Object.entries(attributes)) {
                  if (element.getAttribute(name) !== value) {
                    return false;
                  }
                }
              }
              if (properties) {
                if (!isDeepMatch(properties, element)) {
                  return false;
                }
              }
            }
            return true;

            function isDeepMatch(a, b) {
              if (a === b) {
                return true;
              }
              if ((a && !b) || (!a && b)) {
                return false;
              }
              if (!(a instanceof Object) || !(b instanceof Object)) {
                return false;
              }
              for (const [key, value] of Object.entries(a)) {
                if (!isDeepMatch(value, b[key])) {
                  return false;
                }
              }
              return true;
            }
          },
          properties,
          attributes
        );
      }
      await elementsHandle.dispose();
      return result === visible;
    }, timeout);
  }

  async function querySelectorsAll(selectors, frame) {
    for (const selector of selectors) {
      const result = await querySelectorAll(selector, frame);
      if (result.length) {
        return result;
      }
    }
    return [];
  }

  async function querySelectorAll(selector, frame) {
    if (!Array.isArray(selector)) {
      selector = [selector];
    }
    if (!selector.length) {
      throw new Error('Empty selector provided to querySelectorAll');
    }
    let elements = [];
    for (let i = 0; i < selector.length; i++) {
      const part = selector[i];
      if (i === 0) {
        elements = await frame.$$(part);
      } else {
        const tmpElements = elements;
        elements = [];
        for (const el of tmpElements) {
          elements.push(...(await el.$$(part)));
        }
      }
      if (elements.length === 0) {
        return [];
      }
      if (i < selector.length - 1) {
        const tmpElements = [];
        for (const el of elements) {
          const newEl = (await el.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
          if (newEl) {
            tmpElements.push(newEl);
          }
        }
        elements = tmpElements;
      }
    }
    return elements;
  }

  async function waitForFunction(fn, timeout) {
    let isActive = true;
    const timeoutId = setTimeout(() => {
      isActive = false;
    }, timeout);
    while (isActive) {
      const result = await fn();
      if (result) {
        clearTimeout(timeoutId);
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error('Timed out');
  }

  async function changeSelectElement(element, value) {
    await element.select(value);
    await element.evaluateHandle((e) => {
      e.blur();
      e.focus();
    });
  }

  async function changeElementValue(element, value) {
    await element.focus();
    await element.evaluate((input, value) => {
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }, value);
  }

  async function typeIntoElement(element, value) {
    const textToType = await element.evaluate((input, newValue) => {
      if (
        newValue.length <= input.value.length ||
        !newValue.startsWith(input.value)
      ) {
        input.value = '';
        return newValue;
      }
      const originalValue = input.value;
      input.value = '';
      input.value = originalValue;
      return newValue.substring(originalValue.length);
    }, value);
    await element.type(textToType);
  }
}

module.exports = lighthousecheck;