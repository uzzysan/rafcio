type BrandMarkProps = {
  size: number;
  labelled?: boolean;
};

export function BrandMark({ size, labelled = false }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1005 1005"
      xmlns="http://www.w3.org/2000/svg"
      role={labelled ? 'img' : undefined}
      aria-label={labelled ? 'RM badge' : undefined}
      aria-hidden={labelled ? undefined : 'true'}
    >
      <rect width="1005" height="1005" rx="105" fill="#2E1B34" />
      <path
        fill="#F5F0E8"
        d="M103 229H431C510 229 560 263 560 327C560 395 506 437 402 463 C342 478 299 486 270 505C286 476 315 458 365 445C452 423 475 386 475 330 C475 269 430 236 356 236H243V632C243 678 258 699 299 704V710H103V704 C145 700 160 679 160 632V307C160 260 145 239 103 235Z M270 505C303 481 337 476 370 480C415 485 446 512 481 552L570 655 C612 703 646 724 687 724C712 724 733 718 753 704 C728 740 694 757 651 757C595 757 550 735 505 684L406 571 C361 519 322 496 270 505Z M386 526H392L417 556V742C417 786 433 806 472 811V817H328V811 C369 806 386 786 386 742Z M556 672L783 384C802 360 822 354 849 354H902V360 C866 363 851 383 851 427V742C851 786 866 806 902 811V817H742V811 C779 806 793 786 793 742V405L586 669Z"
      />
      <circle cx="580" cy="669" r="4" fill="#F5F0E8" />
    </svg>
  );
}
