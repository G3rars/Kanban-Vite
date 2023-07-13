import React from 'react'

const genericBtn = 'w-full h-10 px-4 rounded-full capitalize text-md duration-200 mx-auto font-bold'

const btnStyle = {
  btnPrimarylg: `${genericBtn} bg-kpurple/70 text-white h-[48px] hover:bg-kpurpleli dark:hover:bg-kpurple`,
  btnPrimarysm: `${genericBtn} bg-kpurple/70 text-white hover:bg-kpurpleli dark:hover:bg-kpurple`,
  btnSecondary: `${genericBtn} bg-kcian/70 text-kpurple hover:bg-kcian`,
  btnDelete: `${genericBtn} bg-kred/80 text-white hover:bg-kred`
}

const Button = ({ children, style, size, event, btnType, disabled = false }) => {
  if (style === 'primarylg') { style = btnStyle.btnPrimarylg }
  if (style === 'primarysm') { style = btnStyle.btnPrimarysm }
  if (style === 'secondary') { style = btnStyle.btnSecondary }
  if (style === 'delete') { style = btnStyle.btnDelete }

  return (
    <button
      type={btnType ?? 'button'}
      onClick={event}
      className={`${style} ${size}`}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
