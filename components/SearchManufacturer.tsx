'use client'
import { manufacturers } from '@/constants'
import { SearchManufacturerProps } from '@/types'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useState } from 'react'


const SearchManufacturer = ({ manufacturer, setManufacturer }: SearchManufacturerProps) => {
    const [query, setQuery] = useState('')

    const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

    return (
        <div className='search-manufacturer'>
            <Combobox value={manufacturer} onChange={setManufacturer}>
                <div className='relative w-full'>
                    <ComboboxButton className='absolute top-[14px]'>
                        <Image
                            alt='car'
                            width={20}
                            height={20}
                            src='/car-logo.svg'
                            className='ml-4'
                        />
                    </ComboboxButton>

                    <ComboboxInput
                        placeholder='Volswagen'
                        className='search-manufacturer__input'
                        displayValue={(manufacturer: string) => manufacturer}
                        onChange={(e) => setQuery(e.target.value)}
                    />


                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        afterLeave={() => setQuery('')}
                    >
                        <ComboboxOptions>
                            {filteredManufacturers.map(item => (
                                <ComboboxOption
                                    key={item}
                                    className={({ focus }) => `relative search-manufacturer__option ${focus ? 'bg-primary-blue text-white' : 'text-gray-900'}`}
                                    value={item}
                                >
                                    {({ selected, focus }) => (
                                        <>
                                            <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                                {item}
                                            </span>

                                            {/* Show an focus blue background color if the option is selected */}
                                            {selected ? (
                                                <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${focus ? "text-white" : "text-pribg-primary-purple"}`}
                                                ></span>
                                            ) : null}
                                        </>
                                    )}
                                </ComboboxOption>
                            ))
                            }
                        </ComboboxOptions>
                    </Transition>
                </div>
            </Combobox >
        </div>
    )
}

export default SearchManufacturer