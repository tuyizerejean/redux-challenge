import { useEffect } from 'react';
import { FaRegTrashAlt, FaPen, FaLeaf } from 'react-icons/fa';
import { connect } from "react-redux";
import { addAttendee, deleteAttendee, editAttendee, getAttendee } from './redux/actions/attendee-action';

function App(props) {
  const {attendees, getAttendee, addAttendee, editAttendee, deleteAttendee} = props;
  useEffect(() => {
    getAttendee()
  })
  useEffect(() => {}, [attendees])
  const handleForm = (e, action='add', data) => {
    switch(action){
      case 'add': 
        e.preventDefault()
        const attendee = {
          fname: e.target.elements.fname.value,
          lname: e.target.elements.lname.value,
          phone: e.target.elements.phone.value,
          email: e.target.elements.email.value,
          attending: e.target.elements.attending.checked
        }
        addAttendee(attendee)
        e.target.elements.fname.value = ''
        e.target.elements.lname.value =''
        e.target.elements.phone.value = ''
        e.target.elements.email.value = ''
        e.target.elements.attending.checked = false
        break
      case 'edit':
        e.preventDefault()
        console.log('something is ')
        e.target.elements.fname.value = data.fname
        e.target.elements.lname.value = data.lname
        e.target.elements.phone.value = data.phone
        e.target.elements.email.value = data.email
        e.target.elements.attending.checked = data.attending
        break
      default:
        break
      }
    
  }
  const handleDelete = (id) => {
    console.log(id)
    deleteAttendee(id)
  }
  return (
    <div className="text-sm">
      <div className='text-white flex justify-between items-center h-20 max-w-[1240px] mx-auto bg-white shadow-md m-2 p-4'>
        <p className='text-green-200 text-[40px] '><FaLeaf></FaLeaf></p>
        <div className="text-l bg-teal-200 text-teal-800 rounded py-4 px-12">Attending: {attendees.filter((attendee) => attendee.attending).length}</div>
        <div className="text-l bg-red-200 text-red-800 rounded py-4 px-12">Wont Attend: {attendees.filter((attendee) => !attendee.attending).length}</div>
      </div>
      <div className='flex max-w-[1240px] mx-auto h-[700px] justify-between' >
        <div className='bg-white h-full w-[615px] shadow-md p-8 justify-center items-center'>
          <form onSubmit={handleForm}>
            <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">First Name</label>
            <input required name="fname" type="text" id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-teal-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="John" />
            <label  htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Last Name</label>
            <input required name="lname"  type="text" id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-teal-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Doe" />
            <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Telephone</label>
            <input required name="phone"  type="text" id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-teal-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="078XXXXXXX" />
            <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Email</label>
            <input required name="email"  type="text" id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-teal-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="example@gmail.com" />
            <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Will Attend</label>
            <input name="attending"  type="checkbox" id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-teal-700 font-normal h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" />
            <button className="bg-teal-200 text-teal-700 font-semibold py-3 px-10 border border-teal-500 rounded" type='submit'>
              Save
            </button>
          </form>
        </div>
        <div className='bg-white h-full w-[615px] shadow-md block p-4 overflow-auto'>
          {attendees.map((attendee) => (
            <div className={attendee.attending ? 'shadow-md h-15 border-l-8 border-l-teal-200 w-full flex my-2 justify-between items-center p-4' : 'shadow-md h-15 border-l-8 border-l-red-200 w-full flex my-2 justify-between items-center p-4'} key={attendee.id}>
              <p>{`${attendee.fname} ${attendee.lname}`}</p>
              <div className='w-[100px] flex justify-between'>
                <button onClick={() => handleForm('edit', attendee)} className="bg-teal-200 text-teal-800 p-3 border border-teal-800 rounded">
                  <FaPen></FaPen>
                </button>
                <button onClick={()=>{ handleDelete(attendee.id) } } className="bg-red-200 text-red-800 p-3 border border-red-800 rounded">
                  <FaRegTrashAlt></FaRegTrashAlt>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    attendees: state.attendees,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAttendee: () => dispatch(getAttendee()),
    addAttendee: (data) => dispatch(addAttendee(data)),
    editAttendee: (id, newData) => dispatch(editAttendee(id, newData)),
    deleteAttendee: (id) => dispatch(deleteAttendee(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
