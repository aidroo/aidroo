 <form className="flex gap-2">
            <div className="flex justify-between  bg-white rounded-md gap-x-2 items-center pr-1">
              <Input
                type="text"
                name="search"
                placeholder="Search"
                className=" dark:bg-dark h-10 max-w-72 w-[280px] border-none focus-visible:ring-0"
                onChange={(e) => handleInputChange(e)}
              />
              <Select
                value={selectedValue}
                onValueChange={handleValueChange}
                className="focus:ring-0 focus:ring-ring"
              >
                <SelectTrigger className="w-fit bg-gray-200  px-2  ">
                  {/* <Image src={brifcaseIcon} /> */
                }
                 {selectedValue === "business" && (
                    <Image src={brifcaseIcon} className="w-6" />
                  )}
                  {selectedValue === "job" && (
                    <Image src={jobIcons} className="w-6" />
                  )}
                {
                  /* <Image src={workerIcon} className="w-12" /> */
                }
                 </SelectTrigger>
                 <SelectContent>
                   <SelectGroup>
                     <SelectItem value="business">
                       <div className="flex items-center gap-6  border-b pb-2 ">
                         <IconImage
                          src={brifcaseIcon}
                          size={32}
                       alt="notification icon"
                         />
                         <p className={`${font16} text-gray-700`}>Business</p>
                      </div>
                 </SelectItem>
                     <SelectItem value="job">
                       <div className="flex items-center gap-6  border-b pb-2 ">
                         <IconImage
                           src={jobIcons}
                          size={32}
                         alt="notification icon"
                        />
                         <p className={`${font16} text-gray-700`}>Jobs</p>
                      </div>
                    </SelectItem>
                   </SelectGroup>
                 </SelectContent>
                   </Select>
             </div>
                
                {
                  /* fetch dynamic title */
                }
                
                // <ul>
                //   <li>item</li>
                //   <li></li>
                // </ul>
                // <div className="relative">
                {
                  /* <div className=" flex items-center justify-center     bg-primary_color p-1 rounded-md   cursor-pointer w-[42px] h-10">
                              <Image src={filter} alt="Icon 1" className="w-6" />
                            </div> */
                }
                {
                  /* {isHovered2 && (
                            <div className="absolute  shadow rounded-md    top-[42px] pt-4 -right-6 ">
                              <div className=" file:selection: z-50  border-2 rounded   p-8 ">
                                <input type="checkbox" />
                                <Button variant="hoverButton">submit</Button>
                              </div>
                            </div>
                          )} */
                }
                //     </div>
                //     <div className=" flex items-center justify-center  bg-primary_color p-1 rounded-md   cursor-pointer w-[42px] h-10">
                //       <Image src={whitesearch} alt="Icon 1" className="w-6 " />
                //     </div>
                //   </form> */}
                


          
 
<div class="min-h-screen bg-gray-100 flex justify-center items-center">
	<div class="container mx-auto bg-indigo-500 rounded-lg p-14">
		<form>
			<h1 class="text-center font-bold text-white text-4xl">Find the perfect domain name</label>
				<p class="mx-auto font-normal text-sm my-6 max-w-lg">Enter your select domain name and choose any
					extension name in the next step (choose between .com, .online, .tech, .site, .net, and more)</p>
				<div class="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
					<input class="text-base text-gray-400 flex-grow outline-none px-2 " type="text" placeholder="Search your domain name" />
					<div class="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto ">
						<select id="Com" class="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg">
            <option value="com" selected>com</option>
            <option value="net">net</option>
            <option value="org">org</option>
            <option value="io">io</option>
          </select>
						<button class="bg-indigo-500 text-white text-base rounded-lg px-4 py-2 font-thin">Search</button>
					</div>
				</div>
		</form>
	</div>
</div>