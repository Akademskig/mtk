
import React from "react"
import Autocomplete from "react-autocomplete"
import "./index.scss"
export default class Client extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: "",
      values: [],
      selectedItems: [],
      selectedItemsIds: []
    }
  }

  onInputChange = async ($e) => {
    let data
    try {
      data = await fetchProfiles($e.target.value)
    }
    catch (err) {
      return
    }
    this.setState({
      values: data.data
    })
  }
  onChange = async ($e) => {
    this.setState({
      value: $e.target.value
    })
    let data
    try {
      data = await fetchProfiles($e.target.value, this.state.selectedItemsIds, "facebook")
      if (data.error)
        return
    }
    catch (err) {
      return
    }

    this.setState({
      values: data.data
    })

  }
  onSelect = async ($e) => {
    const data = await fetchPlaceInfo($e)
    this.setState({
      values: this.state.values.filter(v => v.id !== $e),
      selectedItems: this.state.selectedItems.concat(data),
      selectedItemsIds: this.state.selectedItemsIds.concat($e)
    })

  }
  render() {
    return (
      <div id="main">
        <div className="autocomplete">
          <label htmlFor="profile" > Search Place </label>
          <Autocomplete
            getItemValue={(item) => item.id}
            items={this.state.values}
            renderItem={(item, isHighlighted) =>
              <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.name}
              </div>
            }
            value={this.state.value}
            onChange={this.onChange.bind(this)}
            onSelect={this.onSelect.bind(this)}
          />
        </div>
        <SelectedList items={this.state.selectedItems}></SelectedList>

      </div>
    )
  }
}

const SelectedList = (props) => {
  return (

    <div className="itemsList">
      {props.items.length > 0 && props.items.map((item, i) =>
        (<div key={i}>
          <h3>{item.name}</h3>
          <p>{item.about}</p>
          <img alt={item.name} src={item.cover ? item.cover.source : "#"}></img>

        </div>)
      )}
    </div>
  )
}
const fetchProfiles = (query, currentValues, type) => {
  const url = new URL(`http://127.0.0.1:3002/api/profile_autocomplete`)
  const params = {
    query,
    currentValues,
    type
  }

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  return fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then(r => r.json()).catch(err => { console.error("An error occurred: ", err); throw err })
}

const fetchPlaceInfo = (id) => {
  const url = new URL(`http://127.0.0.1:3002/api/place_info/${id}`)
  return fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then(r => r.json()).catch(err => { console.error("An error occurred: ", err); throw err })
}
