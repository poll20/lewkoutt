// import React from "react";
import "./SizeChart.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const SizeChart = ({ onBack }) => {
    let navigate=useNavigate()
    let btnClick=()=>{
        navigate(-1)
    }
    let {cate}=useParams()
    console.log("zzzzzzzz",cate)
  return (
    <div className="size-chart-container">
        <div className="btn-and-bs">
      <p>
      <BiArrowBack size={30} onClick={btnClick}/>
      </p>
      </div>
      {
        cate=="bottom"?(<>  
        <div className="btn-and-bss">
            <h2>Body Size (in inch)</h2>
            </div>
            <table className="size-chart-table">
              <thead>
                <tr>
                  <th>Sizes</th>
                  <th>Waist</th>
                  <th>Hips</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>XXS</td>
                  <td>24</td>
                  <td>32</td>
                </tr>
                <tr>
                  <td>XS</td>
                  <td>26</td>
                  <td>34</td>
                </tr>
                <tr>
                  <td>S</td>
                  <td>28</td>
                  <td>36</td>
                </tr>
                <tr>
                  <td>M</td>
                  <td>30</td>
                  <td>38</td>
                </tr>
                <tr>
                  <td>L</td>
                  <td>32</td>
                  <td>40</td>
                </tr>
                <tr>
                  <td>XL</td>
                  <td>34</td>
                  <td>42</td>
                </tr>
                <tr>
                  <td>XXL</td>
                  <td>36</td>
                  <td>44</td>
                </tr>
              </tbody>
            </table>
            </>):(<><div className="btn-and-bss">
      <h2>Body Size (in inch)</h2>
      </div>
      <table className="size-chart-table">
        <thead>
          <tr>
            <th>Sizes</th>
            <th>Bust</th>
            {/* <th>Hips</th> */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>XXS</td>
            <td>24</td>
            {/* <td>32</td> */}
          </tr>
          <tr>
            <td>XS</td>
            <td>26</td>
            {/* <td>34</td> */}
          </tr>
          <tr>
            <td>S</td>
            <td>28</td>
            {/* <td>36</td> */}
          </tr>
          <tr>
            <td>M</td>
            <td>30</td>
            {/* <td>38</td> */}
          </tr>
          <tr>
            <td>L</td>
            <td>32</td>
            {/* <td>40</td> */}
          </tr>
          <tr>
            <td>XL</td>
            <td>34</td>
            {/* <td>42</td> */}
          </tr>
          <tr>
            <td>XXL</td>
            <td>36</td>
            {/* <td>44</td> */}
          </tr>
        </tbody>
      </table>
      </>
      )
      }
      


      
    </div>
  );
};

export default SizeChart;
