'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface CultureCard {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  desktopImage: string;
  mobileImage: string;
  bgColor: string;
  textColor: string;
  descColor: string;
}

const CULTURE_CARDS: CultureCard[] = [
  {
    id: 'performance',
    stepNumber: '01',
    title: 'Performance is a conversation.',
    description:
      'We set clear goals and give feedback you can use. We talk about where you are headed as much as where you have been. Reviews happen on schedule. Conversations about your growth happen whenever needed.',
    desktopImage: '/images/culture/we-build-people/img_Performance%20is%20a%20conversation..png',
    mobileImage:
      '/images/culture/we-build-people/img_Performance%20is%20a%20conversation_mobile%20%281%29.png',
    bgColor: '#63CCB7', // Mint
    textColor: '#042849',
    descColor: '#111111',
  },
  {
    id: 'build-people',
    stepNumber: '02',
    title: 'We build people for the role.',
    description:
      'We identify capability gaps and invest in closing them through mentoring, coaching, leadership development, and stretch assignments that teach you faster than any training module. Development starts from an honest read of where you are, and it is planned against where you want to go.',
    desktopImage: '/images/culture/we-build-people/img_We%20build%20people%20for%20the%20role.png',
    mobileImage:
      '/images/culture/we-build-people/img_We%20build%20people%20for%20the%20role_mobile%20%281%29.png',
    bgColor: '#A9D154', // Lime Green
    textColor: '#042849',
    descColor: '#111111',
  },
  {
    id: 'recognition',
    stepNumber: '03',
    title: 'We recognise the work that moves things forward.',
    description:
      'Water Ripples is our recognition program, built on a simple idea. Recognition belongs to the meaningful and outstanding actions that made the real difference. It rewards ownership, innovation, leadership, and team effort.',
    desktopImage:
      '/images/culture/we-build-people/img_We%20recognise%20the%20work%20that%20moves%20things%20forward.png',
    mobileImage:
      '/images/culture/we-build-people/img_We%20recognise%20the%20work%20that%20moves%20things%20forward_mobile%20%281%29.png',
    bgColor: '#D6A85F', // Golden Ochre
    textColor: '#042849',
    descColor: '#111111',
  },
  {
    id: 'career-step',
    stepNumber: '04',
    title: 'Your career has a next step, and we help you find it.',
    description:
      'We talk to you about where you want to go. Then we build the capabilities and open the opportunities that get you there.',
    desktopImage:
      '/images/culture/we-build-people/img_Your%20career%20has%20a%20next%20step%2C%20and%20we%20help%20you%20find%20it.png',
    mobileImage:
      '/images/culture/we-build-people/img_Your%20career%20has%20a%20next%20step%2C%20and%20we%20help%20you%20find%20it_mobile%20%281%29.png',
    bgColor: '#63CCB7', // Mint
    textColor: '#042849',
    descColor: '#111111',
  },
  {
    id: 'engagement',
    stepNumber: '05',
    title: 'We act on engagement.',
    description:
      'We ask, listen, and close the loop. Feedback that goes nowhere is a survey. Ours turns into decisions.',
    desktopImage: '/images/culture/we-build-people/img_We%20act%20on%20engagement..png',
    mobileImage:
      '/images/culture/we-build-people/img_We%20act%20on%20engagement_mobile%20%281%29.png',
    bgColor: '#A9D154', // Lime Green
    textColor: '#042849',
    descColor: '#111111',
  },
  {
    id: 'onboarding',
    stepNumber: '06',
    title: 'Onboarding doesn’t end on day one.',
    description:
      'Waterpulse keeps us close to your experience with structured check-ins at 30, 60, and 90 days. We use them to catch what is working and fix what is slipping early. We want you to see a future here, and that starts with knowing exactly how you are doing.',
    desktopImage:
      '/images/culture/we-build-people/img_Onboarding%20doesn%E2%80%99t%20end%20on%20day%20one..png',
    mobileImage:
      '/images/culture/we-build-people/img_We%20build%20people%20for%20the%20role_card_01_mobile.png',
    bgColor: '#D6A85F', // Golden Ochre
    textColor: '#042849',
    descColor: '#111111',
  },
];

const LAST_CARD = CULTURE_CARDS.length - 1;
const BACKING_COLORS = ['#63CCB7', '#A9D154', '#D6A85F', '#AE87E4', '#D7DCE2', '#FFFFFF'];

const cardFrame = (depth: number) => ({
  transform: `translate3d(0px, ${Math.max(0, depth) * 8}px, 0) rotate(0deg) scaleX(${1 - Math.max(0, depth) * 0.045})`,
  opacity: depth < 0 ? 0 : 1,
});
// Preserve the original lift, sideways tilt, and reveal poses from the existing stack.
const LIFTED_AWAY = 'translate3d(28px, -90px, 0) rotate(2.5deg) scale(0.97)';
const REVEAL_START = 'translate3d(0px, 24px, 0) rotate(0deg) scale(0.96)';

export const WeBuildPeopleSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const track = section.querySelector<HTMLElement>('[data-card-track]');
    const deck = section.querySelector<HTMLElement>('[data-deck]');
    if (!track || !deck) return;
    const cards = Array.from(section.querySelectorAll<HTMLElement>('[data-culture-card]'));
    const covers = Array.from(section.querySelectorAll<HTMLElement>('[data-card-cover]'));
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let active = 0;
    let settled = 0;
    let frame = 0;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    let animations: Animation[] = [];
    let stepHeight = 1;
    let wheelTotal = 0;
    let wheelLocked = false;
    let wheelDirection = 0;
    let wheelPeak = 0;
    let wheelValley = Infinity;
    let wheelLastMagnitude = 0;
    let wheelRises = 0;
    let wheelPush = 0;
    let wheelSelectedAt = 0;
    let wheelTimer: ReturnType<typeof setTimeout> | undefined;
    let pageTouch: { x: number; y: number; handled: boolean } | null = null;
    const showCard = (index: number, animate: boolean) => {
      if (index === active && animate) return;
      const previous = active;
      const interrupted = new Map<HTMLElement, { transform: string; opacity: string }>();
      cards.forEach((card) => {
        if (!card.getAnimations().some((animation) => animation.playState === 'running')) return;
        const style = getComputedStyle(card);
        interrupted.set(card, { transform: style.transform, opacity: style.opacity });
      });
      animations.forEach((animation) => animation.cancel());
      animations = [];
      cards.forEach((card, position) => {
        Object.assign(card.style, cardFrame(position - index));
        card.style.zIndex = String(CULTURE_CARDS.length - position);
        // Parked cards cannot cover selected text or enter the accessibility tree.
        card.inert = position !== index;
        card.setAttribute('aria-hidden', String(position !== index));
        covers[position].style.opacity = position > index ? '1' : '0';
      });
      active = index;
      if (!animate || motion.matches) return;
      const options = { duration: 440, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' };
      const turningCard = index > previous ? cards[previous] : cards[index];
      turningCard.style.zIndex = '20';
      const front = cardFrame(0).transform;
      // Complete the original motion rather than leaving it tied to a partial scroll.
      animations.push(
        turningCard.animate(
          index > previous
            ? [
                interrupted.get(turningCard) ?? { transform: front, opacity: 1 },
                { transform: LIFTED_AWAY, opacity: 0 },
              ]
            : [
                interrupted.get(turningCard) ?? { transform: LIFTED_AWAY, opacity: 0 },
                { transform: front, opacity: 1 },
              ],
          options,
        ),
      );
      if (index > previous) {
        animations.push(
          cards[index].animate(
            [
              interrupted.get(cards[index]) ?? { transform: REVEAL_START, opacity: 0.88 },
              { transform: front, opacity: 1 },
            ],
            options,
          ),
        );
      } else {
        // The card beneath the returning one must also continue from its visible pose.
        animations.push(
          cards[previous].animate(
            [
              interrupted.get(cards[previous]) ?? { transform: front, opacity: 1 },
              cardFrame(previous - index),
            ],
            options,
          ),
          covers[previous].animate([{ opacity: 0 }, { opacity: 1 }], options),
        );
      }
    };
    const nearest = () =>
      Math.min(LAST_CARD, Math.max(0, Math.round(track.scrollTop / stepHeight)));
    const settle = () => {
      if (!section.dataset.animated) return;
      const index = nearest();
      showCard(index, true);
      if (index !== settled) {
        settled = index;
        setAnnouncement(
          `${CULTURE_CARDS[index].title} Card ${index + 1} of ${CULTURE_CARDS.length}.`,
        );
      }
    };
    const settleEvent = 'onscrollend' in track ? 'scrollend' : null;
    const onScroll = () => {
      if (!section.dataset.animated) return;
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          showCard(nearest(), true);
        });
      }
      if (!settleEvent) {
        clearTimeout(settleTimer);
        settleTimer = setTimeout(settle, 150);
      }
    };
    const goTo = (index: number) => {
      const target = Math.min(LAST_CARD, Math.max(0, index));
      // This track is invisible: only the card animation should move over time.
      // Keeping its snap position synchronous avoids a second, interruptible animation.
      track.scrollTo({ top: target * stepHeight, behavior: 'instant' });
      showCard(target, true);
    };
    const resetWheelGesture = () => {
      wheelLocked = false;
      wheelTotal = 0;
      wheelPeak = 0;
      wheelValley = Infinity;
      wheelLastMagnitude = 0;
      wheelRises = 0;
      wheelPush = 0;
    };
    const lockWheelGesture = (magnitude: number) => {
      wheelLocked = true;
      wheelPeak = magnitude;
      wheelValley = magnitude;
      wheelLastMagnitude = magnitude;
      wheelRises = 0;
      wheelPush = 0;
      wheelSelectedAt = performance.now();
    };
    const extendWheelGesture = () => {
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(resetWheelGesture, 180);
    };
    const onWheel = (event: WheelEvent) => {
      if (
        !section.dataset.animated ||
        event.defaultPrevented ||
        !event.cancelable ||
        event.ctrlKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
      )
        return;
      const direction = Math.sign(event.deltaY);
      if (!direction) return;
      const target = event.target instanceof Element ? event.target : null;
      if (
        target?.closest(
          'input, textarea, select, [contenteditable="true"], dialog, [role="dialog"]',
        )
      )
        return;
      const delta =
        event.deltaY *
        (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      const rect = section.getBoundingClientRect();
      const readingTop = Math.min(120, Math.max(72, (window.innerHeight - rect.height) / 2));
      const inReadingArea = rect.top >= 72 && rect.bottom <= window.innerHeight;
      const enteringFromAbove =
        direction > 0 && rect.top > readingTop && rect.top - delta <= readingTop;
      const enteringFromBelow =
        direction < 0 && rect.top < readingTop && rect.top - delta >= readingTop;
      if (!track.contains(target) && !inReadingArea && !enteringFromAbove && !enteringFromBelow)
        return;
      // An intentional reversal must not wait for the previous gesture's inertia timer.
      if (direction !== wheelDirection) {
        resetWheelGesture();
      }
      wheelDirection = direction;
      if (!inReadingArea && (enteringFromAbove || enteringFromBelow)) {
        // A large page scroll must land on the stack rather than skip its cards.
        event.preventDefault();
        window.scrollBy({ top: rect.top - readingTop, behavior: 'instant' });
        const index = enteringFromAbove ? 0 : LAST_CARD;
        track.scrollTo({ top: index * stepHeight, behavior: 'instant' });
        showCard(index, false);
        lockWheelGesture(Math.abs(delta));
        wheelTotal = 0;
        extendWheelGesture();
        return;
      }
      const current = nearest();
      if (
        !wheelLocked &&
        ((current === 0 && direction < 0) || (current === LAST_CARD && direction > 0))
      )
        return;
      // One trackpad/wheel gesture selects one full card; momentum cannot skip the deck.
      if (wheelLocked) {
        const magnitude = Math.abs(delta);
        // Trackpads can start a new push before the old momentum tail goes quiet.
        // Accept renewed acceleration after a valley, never elapsed time alone.
        if (wheelValley <= Math.max(2, wheelPeak * 0.25)) {
          if (magnitude > wheelLastMagnitude * 1.15) {
            wheelRises += 1;
            wheelPush += magnitude;
          } else if (magnitude < wheelLastMagnitude * 0.85) {
            wheelRises = 0;
            wheelPush = 0;
          } else if (wheelRises > 0) {
            wheelPush += magnitude;
          }
        }
        const renewedPush =
          performance.now() - wheelSelectedAt >= 240 &&
          wheelRises >= 2 &&
          wheelPush >= 24 &&
          magnitude >= 4 &&
          magnitude >= wheelValley * 2.5;
        wheelPeak = Math.max(wheelPeak, magnitude);
        wheelValley = Math.min(wheelValley, magnitude);
        wheelLastMagnitude = magnitude;
        if (!renewedPush) {
          event.preventDefault();
          extendWheelGesture();
          return;
        }
        wheelLocked = false;
        wheelTotal = direction * (wheelPush - magnitude);
        if ((current === 0 && direction < 0) || (current === LAST_CARD && direction > 0)) {
          resetWheelGesture();
          return;
        }
      }
      event.preventDefault();
      extendWheelGesture();
      wheelTotal = Math.sign(wheelTotal) === direction ? wheelTotal + delta : delta;
      if (Math.abs(wheelTotal) < 24) return;
      lockWheelGesture(Math.abs(delta));
      goTo(current + direction);
    };
    const onTouchStart = (event: TouchEvent) => {
      pageTouch = null;
      const target = event.target instanceof Element ? event.target : null;
      if (
        !section.dataset.animated ||
        event.touches.length !== 1 ||
        track.contains(target) ||
        target?.closest(
          'input, textarea, select, [contenteditable="true"], dialog, [role="dialog"]',
        )
      )
        return;
      const rect = section.getBoundingClientRect();
      if (rect.top < 72 || rect.bottom > window.innerHeight) return;
      const touch = event.touches[0];
      pageTouch = { x: touch.clientX, y: touch.clientY, handled: false };
    };
    const onTouchMove = (event: TouchEvent) => {
      if (!pageTouch || event.touches.length !== 1 || !event.cancelable) return;
      const touch = event.touches[0];
      const delta = pageTouch.y - touch.clientY;
      if (Math.abs(touch.clientX - pageTouch.x) > Math.abs(delta)) {
        pageTouch = null;
        return;
      }
      if (pageTouch.handled) {
        event.preventDefault();
        return;
      }
      const current = nearest();
      const direction = Math.sign(delta);
      if ((current === 0 && direction < 0) || (current === LAST_CARD && direction > 0)) {
        pageTouch = null;
        return;
      }
      // Outside-card swipes have the same page-level selection as wheel input.
      event.preventDefault();
      if (Math.abs(delta) < 24) return;
      pageTouch.handled = true;
      goTo(current + direction);
    };
    const onTouchEnd = () => {
      pageTouch = null;
    };
    const setup = () => {
      pageTouch = null;
      resetWheelGesture();
      clearTimeout(wheelTimer);
      animations.forEach((animation) => animation.cancel());
      animations = [];
      if (!motion.matches) section.dataset.animated = 'true';
      // Keep ordinary page scrolling when a whole card cannot fit on screen.
      if (motion.matches || deck.offsetHeight > window.innerHeight - 72) {
        delete section.dataset.animated;
        cards.forEach((card, index) => {
          card.removeAttribute('style');
          card.inert = false;
          card.removeAttribute('aria-hidden');
          covers[index].style.removeProperty('opacity');
        });
        return;
      }
      stepHeight = deck.offsetHeight;
      section.style.setProperty('--deck-height', `${stepHeight}px`);
      track.scrollTo({ top: active * stepHeight, behavior: 'instant' });
      showCard(active, false);
    };
    const observer = new ResizeObserver(setup);
    observer.observe(deck);
    motion.addEventListener('change', setup);
    window.addEventListener('resize', setup);
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', onTouchEnd);
    if (settleEvent) track.addEventListener(settleEvent, settle);
    setup();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(settleTimer);
      clearTimeout(wheelTimer);
      animations.forEach((animation) => animation.cancel());
      motion.removeEventListener('change', setup);
      window.removeEventListener('resize', setup);
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      if (settleEvent) track.removeEventListener(settleEvent, settle);
      delete section.dataset.animated;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="culture-card-stack layout-margin bg-ghost-white"
      aria-label="Culture at Waterlabs - How we work"
      aria-roledescription="carousel"
    >
      <div className="relative mx-auto max-w-[1320px]">
        <div
          data-card-track
          className="focus-visible:outline-electric-blue hidden rounded-[30px] focus-visible:outline-2 focus-visible:outline-offset-4"
          tabIndex={0}
          role="group"
          aria-label="Culture cards. Scroll or swipe vertically to change cards."
        >
          <div data-card-rail>
            <div data-card-snap-points aria-hidden="true">
              {CULTURE_CARDS.map((card) => (
                <div key={card.id} data-card-snap-point />
              ))}
            </div>
          </div>
        </div>
        <div data-deck className="mx-auto grid max-w-[1320px] gap-6">
          {CULTURE_CARDS.map((card, index) => {
            return (
              <div
                key={card.id}
                data-culture-card
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${CULTURE_CARDS.length}`}
                style={{ zIndex: CULTURE_CARDS.length - index }}
                className="relative flex w-full flex-col overflow-hidden rounded-[30px_10px_30px_30px] bg-white lg:h-[433px] lg:flex-row"
              >
                {/* Desktop Full-Span Image (Transparent Left, Photo on Right) */}
                <div className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full overflow-hidden lg:block">
                  <Image
                    src={card.desktopImage}
                    alt={card.title}
                    fill
                    priority={index === 0}
                    sizes="1320px"
                    className="object-cover object-[35%_center] xl:object-right"
                  />
                </div>

                {/* Mint/Lime/Gold Content Box */}
                <div
                  className="relative z-10 flex w-full flex-1 shrink-0 flex-col items-start justify-center rounded-[30px_0px_0px_0px] p-[24px] sm:p-[32px] lg:h-full lg:w-[480px] lg:flex-none lg:!rounded-[30px_0px_60px_0px] lg:p-[36px] xl:w-[539px] xl:p-[40px]"
                  style={{
                    backgroundColor: card.bgColor,
                  }}
                >
                  <div className="my-auto flex w-full flex-col items-start gap-[12px] lg:gap-[16px]">
                    {/* Card Heading — Display/H3 on mobile, Display/H2 on md+ */}
                    <h3
                      className="type-h3 md:type-h2 max-w-[459px]"
                      style={{ color: card.textColor }}
                    >
                      {card.title}
                    </h3>

                    {/* Card Description — Body/Body-XS on mobile, Body/Body-S on md+ */}
                    <p
                      className="type-body-xs md:type-body-s max-w-[459px]"
                      style={{ color: card.descColor }}
                    >
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Mobile / Tablet Image Box */}
                <div className="relative block h-[225px] w-full shrink-0 overflow-hidden rounded-[0px_10px_30px_30px] sm:h-[250px] lg:hidden">
                  <Image
                    src={card.mobileImage}
                    alt={card.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-cover object-center"
                  />
                </div>
                <div
                  data-card-cover
                  aria-hidden="true"
                  className="hidden"
                  style={{ backgroundColor: BACKING_COLORS[index] }}
                />
              </div>
            );
          })}
        </div>
      </div>
      <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </span>
    </section>
  );
};

export default WeBuildPeopleSection;
